import { Chequeo } from '../../domain/entities/chequeo.entity';
import { ChequeoEntity } from '../entities/chequeo.typeorm.entity';

export class ChequeoMapper {
    static toDomain(entity: ChequeoEntity): Chequeo {
        return new Chequeo(String(entity.id), '', '', entity.fechaChequeo || new Date(), entity.fechaChequeo || new Date());
    }
    static toEntity(domain: Chequeo): ChequeoEntity {
        const entity = new ChequeoEntity();
        if (domain.id && !isNaN(Number(domain.id))) entity.id = Number(domain.id);
        entity.fechaChequeo = domain.createdAt || new Date();
        entity.confirmado = false;
        return entity;
    }
}
