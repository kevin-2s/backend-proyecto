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
    try {
      console.log('Cambiando estado solicitud:', id, estado, id_usuario_aprueba);
      const solicitud = await this.obtenerSolicitudPorId(id);
      console.log('Solicitud encontrada:', solicitud);
      const updateData: any = { estado };
      if (id_usuario_aprueba) {
        updateData.id_usuario_aprueba = id_usuario_aprueba;
      }
      console.log('Update data:', updateData);
      const result = await this.solicitudesRepository.update(id, updateData);
      console.log('Resultado:', result);
      return result;
    } catch (error) {
      console.error('Error en cambiarEstadoSolicitud:', error);
      throw error;
    }
  }
}
