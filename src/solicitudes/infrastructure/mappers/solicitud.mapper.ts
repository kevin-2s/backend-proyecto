import { Solicitud } from '../../domain/entities/solicitud.entity';
import { SolicitudEntity } from '../entities/solicitud.typeorm.entity';
import { EstadoSolicitud } from '../../../shared/domain/enums';

export class SolicitudMapper {
  static toDomain(entity: SolicitudEntity): Solicitud {
    return new Solicitud(
      Number(entity.id),
      entity.fechaSol || new Date(),
      entity.fechaRespuesta || null,
      String(entity.estadoSol),
      entity.justificacion || '',
      entity.observacionRespuesta || '',
      entity.usuario ? Number(entity.usuario.id) : (entity as any).usuarioId || 0,
      entity.usuarioResponde ? Number(entity.usuarioResponde.id) : (entity as any).usuarioRespondeId || null,
    );
  }

  static toEntity(domain: any): SolicitudEntity {
    const entity = new SolicitudEntity();
    if (domain.id && !isNaN(Number(domain.id))) entity.id = Number(domain.id);
    entity.justificacion = domain.justificacion || '';
    entity.estadoSol = domain.estadoSol || EstadoSolicitud.PENDIENTE;
    entity.fechaSol = domain.fechaSol || new Date();
    entity.fechaRespuesta = domain.fechaRespuesta || null;
    entity.observacionRespuesta = domain.observacionRespuesta || '';
    (entity as any).usuarioId = domain.usuarioId;
    (entity as any).usuarioRespondeId = domain.usuarioRespondeId || null;
    return entity;
  }
}