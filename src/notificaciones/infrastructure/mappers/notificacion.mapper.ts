import { Notificacion } from '../../domain/entities/notificacion.entity';
import { NotificacionEntity } from '../entities/notificacion.typeorm.entity';

export class NotificacionMapper {
    static toDomain(entity: NotificacionEntity): Notificacion {
        return new Notificacion(String(entity.id), '', '', false, entity.fechaEnvio || new Date(), entity.fechaEnvio || new Date());
    }
    static toEntity(domain: Notificacion): NotificacionEntity {
        const entity = new NotificacionEntity();
        if (domain.id && !isNaN(Number(domain.id))) entity.id = Number(domain.id);
        entity.fechaEnvio = domain.createdAt || new Date();
        entity.mensaje = 'Notificacion';
        entity.leida = false;
        entity.tipoEvento = 'INFO';
        return entity;
    }
}
