import { Ficha } from '../../domain/entities/ficha.entity';
import { FichaEntity } from '../entities/ficha.typeorm.entity';

export class FichaMapper {
    static toDomain(entity: FichaEntity): Ficha {
        return new Ficha(
            entity.id,
            entity.codigo,
            entity.programa,
            entity.estado,
            entity.createdAt,
            entity.updatedAt
        );
    }

    static toEntity(domain: Ficha): FichaEntity {
        const entity = new FichaEntity();
        if (domain.id) entity.id = domain.id;
        entity.codigo = domain.codigo;
        entity.programa = domain.programa;
        entity.estado = domain.estado;
        return entity;
    }
}
