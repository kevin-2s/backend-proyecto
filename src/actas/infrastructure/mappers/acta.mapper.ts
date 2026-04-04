import { Acta } from '../../domain/entities/acta.entity';
import { ActaEntity } from '../entities/acta.typeorm.entity';

export class ActaMapper {
    static toDomain(entity: ActaEntity): Acta {
        return new Acta(
            entity.id,
            entity.movimientoId,
            entity.tipoActa,
            entity.urlPdf,
            entity.generadoPor,
            entity.createdAt,
            entity.updatedAt
        );
    }

    static toEntity(domain: Acta): ActaEntity {
        const entity = new ActaEntity();
        if (domain.id) entity.id = domain.id;
        entity.movimientoId = domain.movimientoId;
        entity.tipoActa = domain.tipoActa;
        entity.urlPdf = domain.urlPdf;
        entity.generadoPor = domain.generadoPor;
        return entity;
    }
}
