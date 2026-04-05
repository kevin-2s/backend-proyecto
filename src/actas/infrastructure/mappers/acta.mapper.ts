import { Acta } from '../../domain/entities/acta.entity';
import { ActaEntity } from '../entities/acta.typeorm.entity';

export class ActaMapper {
    static toDomain(entity: ActaEntity): Acta {
        return new Acta(String(entity.id), '', '', '', '', entity.fechaGen || new Date(), entity.fechaGen || new Date());
    }
    static toEntity(domain: Acta): ActaEntity {
        const entity = new ActaEntity();
        if (domain.id && !isNaN(Number(domain.id))) entity.id = Number(domain.id);
        entity.fechaGen = domain.createdAt || new Date();
        entity.urlPdf = '';
        return entity;
    }
}
