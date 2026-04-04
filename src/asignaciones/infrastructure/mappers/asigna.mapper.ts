import { Asigna } from '../../domain/entities/asigna.entity';
import { AsignaEntity } from '../entities/asigna.typeorm.entity';

export class AsignaMapper {
    static toDomain(entity: AsignaEntity): Asigna {
        return new Asigna(
            entity.id,
            entity.solicitudId,
            entity.inventarioId,
            entity.cantidad,
            entity.createdAt,
            entity.updatedAt
        );
    }

    static toEntity(domain: Asigna): AsignaEntity {
        const entity = new AsignaEntity();
        if (domain.id) entity.id = domain.id;
        entity.solicitudId = domain.solicitudId;
        entity.inventarioId = domain.inventarioId;
        entity.cantidad = domain.cantidad;
        return entity;
    }
}
