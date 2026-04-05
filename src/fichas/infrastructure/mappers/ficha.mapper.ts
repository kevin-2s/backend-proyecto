import { Ficha } from '../../domain/entities/ficha.entity';
import { FichaEntity } from '../entities/ficha.typeorm.entity';

export class FichaMapper {
    static toDomain(entity: FichaEntity): Ficha {
        return new Ficha(String(entity.id), entity.numeroFicha || '', entity.programa || '', '', new Date(), new Date());
    }
    static toEntity(domain: Ficha): FichaEntity {
        const entity = new FichaEntity();
        if (domain.id && !isNaN(Number(domain.id))) entity.id = Number(domain.id);
        entity.numeroFicha = domain.codigo || '';
        entity.programa = domain.estado || '';
        return entity;
    }
}
