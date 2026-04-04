import { Notificacion } from '../../domain/entities/notificacion.entity';
import { NotificacionEntity } from '../entities/notificacion.typeorm.entity';

export class NotificacionMapper {
    static toDomain(entity: NotificacionEntity): Notificacion {
        return new Notificacion(
            entity.id,
            entity.usuarioId,
            entity.mensaje,
            entity.leida,
            entity.createdAt,
            entity.updatedAt
        );
    }

    static toEntity(domain: Notificacion): NotificacionEntity {
        const entity = new NotificacionEntity();
        if (domain.id) entity.id = domain.id;
        entity.usuarioId = domain.usuarioId;
        entity.mensaje = domain.mensaje;
        entity.leida = domain.leida;
        return entity;
    }
}
