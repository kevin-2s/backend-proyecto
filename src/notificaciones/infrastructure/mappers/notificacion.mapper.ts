import { Notificacion } from '../../domain/entities/notificacion.entity';
import { NotificacionEntity } from '../entities/notificacion.typeorm.entity';

export class NotificacionMapper {
  static toDomain(entity: NotificacionEntity): Notificacion {
    return new Notificacion(
      Number(entity.id),
      entity.mensaje || '',
      Boolean(entity.leida),
      entity.fechaEnvio || new Date(),
      entity.tipoEvento || '',
      entity.usuario ? Number(entity.usuario.id) : (entity as any).usuarioId || 0,
    );
  }

  static toEntity(domain: Notificacion): NotificacionEntity {
    const entity = new NotificacionEntity();
    if (domain.id && !isNaN(Number(domain.id))) entity.id = Number(domain.id);
    entity.mensaje = domain.mensaje;
    entity.leida = domain.leida ?? false;
    entity.fechaEnvio = domain.fechaEnvio || new Date();
    entity.tipoEvento = domain.tipoEvento;
    (entity as any).usuarioId = domain.usuarioId;
    return entity;
  }
}