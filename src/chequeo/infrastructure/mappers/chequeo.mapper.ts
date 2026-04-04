import { Chequeo } from '../../domain/entities/chequeo.entity';
import { ChequeoEntity } from '../entities/chequeo.typeorm.entity';

export class ChequeoMapper {
    static toDomain(entity: ChequeoEntity): Chequeo {
        return new Chequeo(
            entity.id,
            entity.sitioId,
            entity.responsableId,
            entity.createdAt,
            entity.updatedAt
        );
    }

    static toEntity(domain: Chequeo): ChequeoEntity {
        const entity = new ChequeoEntity();
        if (domain.id) entity.id = domain.id;
        entity.sitioId = domain.sitioId;
        entity.responsableId = domain.responsableId;
        return entity;
    }
}
