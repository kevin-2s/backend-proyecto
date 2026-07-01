import { Injectable, Inject } from '@nestjs/common';
import { ISolicitudesUseCases } from '../../domain/ports/input/solicitudes-use-cases.interface';
import { ISolicitudesRepository, SOLICITUDES_REPOSITORY } from '../../domain/ports/output/solicitudes-repository.interface';
import { Solicitud, EstadoSolicitud, TipoSolicitud } from '../../domain/entities/solicitud.domain.entity';
import { SolicitudNotFoundException } from '../../domain/exceptions/solicitud-not-found.exception';
import { AutoAprobacionSolicitudForbiddenException } from '../../domain/exceptions/auto-aprobacion-solicitud.exception';
import { SoloResponsablePuedeAprobarSolicitudForbiddenException } from '../../domain/exceptions/solo-responsable-puede-aprobar.exception';
import { INotificacionesRepository, NOTIFICACIONES_REPOSITORY } from '../../../notificaciones/domain/ports/output/notificaciones-repository.interface';

@Injectable()
export class SolicitudesService implements ISolicitudesUseCases {
  constructor(
    @Inject(SOLICITUDES_REPOSITORY)
    private readonly solicitudesRepository: ISolicitudesRepository,
    @Inject(NOTIFICACIONES_REPOSITORY)
    private readonly notificacionesRepository: INotificacionesRepository,
  ) {}

  async obtenerSolicitudes(userId: number, role: string): Promise<Solicitud[]> {
    if (role === 'Administrador') {
      return this.solicitudesRepository.findAll();
    }
    // Cualquier usuario asignado como responsable de al menos un sitio ve las solicitudes de sus bodegas
    // (no importa si su rol es Instructor, Responsable de Bodega, u otro)
    const esResponsable = await this.solicitudesRepository.isResponsableOfAnySitio(userId);
    if (esResponsable) {
      return this.solicitudesRepository.findForResponsable(userId);
    }
    // Aprendiz, Instructor sin bodega asignada, etc.: solo sus propias solicitudes
    return this.solicitudesRepository.findByUsuario(userId);
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

  async cambiarEstadoSolicitud(
    id: number,
    estado: EstadoSolicitud,
    id_usuario_aprueba: number,
    isAdmin: boolean,
  ): Promise<Solicitud> {
    const solicitud = await this.obtenerSolicitudPorId(id);

    // Nunca puede aprobar su propia solicitud
    if (id_usuario_aprueba === solicitud.id_usuario) {
      throw new AutoAprobacionSolicitudForbiddenException();
    }

    if (solicitud.id_producto) {
      const info = await this.solicitudesRepository.getResponsableForProducto(solicitud.id_producto);

      if (info?.id_responsable) {
        // La bodega tiene responsable asignado: solo ese responsable puede aprobar/rechazar
        if (info.id_responsable !== id_usuario_aprueba) {
          throw new SoloResponsablePuedeAprobarSolicitudForbiddenException();
        }
      } else if (!isAdmin) {
        // Sin responsable asignado: solo el Administrador puede aprobar
        throw new SoloResponsablePuedeAprobarSolicitudForbiddenException();
      }
    }

    return this.solicitudesRepository.update(id, { estado, id_usuario_aprueba });
  }

  async entregarSolicitud(id: number): Promise<Solicitud> {
    await this.obtenerSolicitudPorId(id);
    return this.solicitudesRepository.marcarEntregada(id);
  }
}
