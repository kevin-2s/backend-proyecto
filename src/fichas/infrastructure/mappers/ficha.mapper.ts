import { Ficha } from '../../domain/entities/ficha.entity';
import { FichaEntity } from '../entities/ficha.typeorm.entity';

export class FichaMapper {
    static toDomain(entity: FichaEntity): Ficha {
        return new Ficha(
            Number(entity.id),
            entity.numeroFicha,
            entity.programa
        );
    }
    static toEntity(domain: any): FichaEntity {
        const entity = new FichaEntity();
        if (domain.id && !isNaN(Number(domain.id))) entity.id = Number(domain.id);
        entity.numeroFicha = domain.numeroFicha || '';
        entity.programa = domain.programa || '';
        return entity;
    }
}
