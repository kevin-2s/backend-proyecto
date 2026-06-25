import { Injectable, Inject } from '@nestjs/common';
import { ITrasladosUseCases } from '../../domain/ports/input/traslados-use-cases.interface';
import { ITrasladosRepository, TRASLADOS_REPOSITORY } from '../../domain/ports/output/traslados-repository.interface';
import { Traslado, EstadoTraslado } from '../../domain/entities/traslado.domain.entity';
import { TrasladoNotFoundException } from '../../domain/exceptions/traslado-not-found.exception';
import { INotificacionesRepository, NOTIFICACIONES_REPOSITORY } from '../../../notificaciones/domain/ports/output/notificaciones-repository.interface';

@Injectable()
export class TrasladosService implements ITrasladosUseCases {
  constructor(
    @Inject(TRASLADOS_REPOSITORY)
    private readonly repository: ITrasladosRepository,
    @Inject(NOTIFICACIONES_REPOSITORY)
    private readonly notificacionesRepository: INotificacionesRepository,
  ) {}

  async obtenerTraslados(): Promise<Traslado[]> {
    return this.repository.findAll();
  }

  async obtenerTrasladoPorId(id: number): Promise<Traslado> {
    const traslado = await this.repository.findById(id);
    if (!traslado) throw new TrasladoNotFoundException(id);
    return traslado;
  }

  async crearTraslado(data: {
    id_item: number;
    id_sitio_destino: number;
    justificacion?: string | null;
    id_usuario_solicita: number;
  }): Promise<Traslado> {
    const ubicacion = await this.repository.obtenerUbicacionActualDeItem(data.id_item);
    if (!ubicacion) {
      throw new Error(`Ítem con id ${data.id_item} no encontrado`);
    }
    if (!ubicacion.id_sitio) {
      throw new Error('El ítem no tiene una ubicación asignada actualmente, no se puede trasladar');
    }
    if (ubicacion.estado !== 'DISPONIBLE') {
      throw new Error(`Solo se pueden trasladar ítems disponibles (estado actual: ${ubicacion.estado})`);
    }
    if (ubicacion.id_sitio === data.id_sitio_destino) {
      throw new Error('El ítem ya se encuentra en ese lugar');
    }

    const pendiente = await this.repository.findPendienteByItem(data.id_item);
    if (pendiente) {
      throw new Error('Este ítem ya tiene una solicitud de traslado pendiente');
    }

    const traslado = await this.repository.create({
      id_item: data.id_item,
      id_sitio_origen: ubicacion.id_sitio,
      id_sitio_destino: data.id_sitio_destino,
      id_usuario_solicita: data.id_usuario_solicita,
      estado: EstadoTraslado.PENDIENTE,
      fecha_solicitud: new Date(),
      justificacion: data.justificacion ?? null,
    });

    try {
      const origen = await this.repository.obtenerResponsableDeSitio(ubicacion.id_sitio);
      const destino = await this.repository.obtenerResponsableDeSitio(data.id_sitio_destino);
      if (origen?.id_responsable) {
        await this.notificacionesRepository.create({
          mensaje: `Solicitud de traslado: "${ubicacion.descripcion}" quiere trasladarse de "${origen.nombre_sitio}" a "${destino?.nombre_sitio ?? 'otro lugar'}". Requiere su aprobación.`,
          id_usuario: origen.id_responsable,
        });
      }
    } catch {
      // No interrumpir si falla la notificación
    }

    return traslado;
  }

  async aprobarTraslado(id: number, id_usuario_aprueba: number): Promise<Traslado> {
    const traslado = await this.obtenerTrasladoPorId(id);
    if (traslado.estado !== EstadoTraslado.PENDIENTE) {
      throw new Error('Esta solicitud de traslado ya fue resuelta');
    }

    await this.repository.moverItem(traslado.id_item, traslado.id_sitio_destino);
    const actualizado = await this.repository.update(id, {
      estado: EstadoTraslado.APROBADO,
      id_usuario_aprueba,
      fecha_resolucion: new Date(),
    });

    try {
      await this.notificacionesRepository.create({
        mensaje: 'Tu solicitud de traslado fue aprobada. El ítem ahora pertenece a su nueva ubicación.',
        id_usuario: traslado.id_usuario_solicita,
      });
    } catch {
      // No interrumpir si falla la notificación
    }

    return actualizado;
  }

  async rechazarTraslado(id: number, id_usuario_aprueba: number, observacion_resolucion?: string | null): Promise<Traslado> {
    const traslado = await this.obtenerTrasladoPorId(id);
    if (traslado.estado !== EstadoTraslado.PENDIENTE) {
      throw new Error('Esta solicitud de traslado ya fue resuelta');
    }

    const actualizado = await this.repository.update(id, {
      estado: EstadoTraslado.RECHAZADO,
      id_usuario_aprueba,
      fecha_resolucion: new Date(),
      observacion_resolucion: observacion_resolucion ?? null,
    });

    try {
      await this.notificacionesRepository.create({
        mensaje: `Tu solicitud de traslado fue rechazada.${observacion_resolucion ? ' Motivo: ' + observacion_resolucion : ''}`,
        id_usuario: traslado.id_usuario_solicita,
      });
    } catch {
      // No interrumpir si falla la notificación
    }

    return actualizado;
  }
}
