import { Injectable, Inject } from '@nestjs/common';
import { ISolicitudesUseCases } from '../../domain/ports/input/solicitudes-use-cases.interface';
import { ISolicitudesRepository, SOLICITUDES_REPOSITORY } from '../../domain/ports/output/solicitudes-repository.interface';
import { Solicitud, EstadoSolicitud, TipoSolicitud } from '../../domain/entities/solicitud.domain.entity';
import { SolicitudNotFoundException } from '../../domain/exceptions/solicitud-not-found.exception';

@Injectable()
export class SolicitudesService implements ISolicitudesUseCases {
  constructor(
    @Inject(SOLICITUDES_REPOSITORY)
    private readonly solicitudesRepository: ISolicitudesRepository,
  ) {}

  async obtenerSolicitudes(): Promise<Solicitud[]> {
    return this.solicitudesRepository.findAll();
  }

  async obtenerSolicitudPorId(id: number): Promise<Solicitud> {
    const solicitud = await this.solicitudesRepository.findById(id);
    if (!solicitud) {
      throw new SolicitudNotFoundException(id);
    }
    return solicitud;
  }

  async crearSolicitud(data: {
    tipo: TipoSolicitud;
    observacion?: string | null;
    id_usuario: number;
    id_ficha?: number | null;
  }): Promise<Solicitud> {
    return this.solicitudesRepository.create({
      fecha: new Date(),
      estado: EstadoSolicitud.PENDIENTE,
      tipo: data.tipo,
      observacion: data.observacion ?? null,
      id_usuario: data.id_usuario,
      id_ficha: data.id_ficha,
      id_usuario_aprueba: null,
    });
  }

  async cambiarEstadoSolicitud(id: number, estado: EstadoSolicitud, id_usuario_aprueba?: number): Promise<Solicitud> {
    await this.obtenerSolicitudPorId(id);
    const updateData: any = { estado };
    if (id_usuario_aprueba) {
      updateData.id_usuario_aprueba = id_usuario_aprueba;
    }
    return this.solicitudesRepository.update(id, updateData);
  }
}
