import { Injectable, Inject } from '@nestjs/common';
import { ISolicitudesUseCases } from '../../domain/ports/input/solicitudes-use-cases.interface';
import { ISolicitudesRepository, SOLICITUDES_REPOSITORY } from '../../domain/ports/output/solicitudes-repository.interface';
import { Solicitud, EstadoSolicitud, TipoSolicitud } from '../../domain/entities/solicitud.domain.entity';
import { SolicitudNotFoundException } from '../../domain/exceptions/solicitud-not-found.exception';
import { INotificacionesRepository, NOTIFICACIONES_REPOSITORY } from '../../../notificaciones/domain/ports/output/notificaciones-repository.interface';

@Injectable()
export class SolicitudesService implements ISolicitudesUseCases {
  constructor(
    @Inject(SOLICITUDES_REPOSITORY)
    private readonly solicitudesRepository: ISolicitudesRepository,
    @Inject(NOTIFICACIONES_REPOSITORY)
    private readonly notificacionesRepository: INotificacionesRepository,
  ) {}

  async obtenerSolicitudes(): Promise<Solicitud[]> {
    return this.solicitudesRepository.findAll();
  }

  async obtenerSolicitudPorId(id: number): Promise<Solicitud> {
    const solicitud = await this.solicitudesRepository.findById(id);
    if (!solicitud) throw new SolicitudNotFoundException(id);
    return solicitud;
  }

  async crearSolicitud(data: {
    tipo: TipoSolicitud;
    id_producto: number;
    cantidad: number;
    observacion?: string | null;
    id_usuario: number;
    id_ficha?: number | null;
  }): Promise<Solicitud> {
    const solicitud = await this.solicitudesRepository.create({
      fecha: new Date(),
      estado: EstadoSolicitud.PENDIENTE,
      tipo: data.tipo,
      id_producto: data.id_producto,
      cantidad: data.cantidad,
      observacion: data.observacion ?? null,
      id_usuario: data.id_usuario,
      id_ficha: data.id_ficha ?? null,
      id_usuario_aprueba: null,
    });

    // Notificar al responsable de la bodega
    try {
      const info = await this.solicitudesRepository.getResponsableForProducto(data.id_producto);
      if (info?.id_responsable) {
        await this.notificacionesRepository.create({
          mensaje: `Nueva solicitud de préstamo: ${data.cantidad} unidad(es) de "${info.nombre_producto}" desde la bodega "${info.nombre_bodega}". Requiere su aprobación.`,
          id_usuario: info.id_responsable,
        });
      }
    } catch {
      // No interrumpir si falla la notificación
    }

    return solicitud;
  }

  async cambiarEstadoSolicitud(id: number, estado: EstadoSolicitud, id_usuario_aprueba?: number): Promise<Solicitud> {
    const solicitud = await this.obtenerSolicitudPorId(id);
    const updateData: any = { estado };
    if (id_usuario_aprueba) updateData.id_usuario_aprueba = id_usuario_aprueba;
    return this.solicitudesRepository.update(id, updateData);
  }
}
