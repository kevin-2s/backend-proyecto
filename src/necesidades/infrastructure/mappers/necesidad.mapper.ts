import { Necesidad } from '../../domain/entities/necesidad.entity';
import { NecesidadEntity } from '../entities/necesidad.typeorm.entity';

export class NecesidadMapper {
    static toDomain(entity: NecesidadEntity): Necesidad {
        return new Necesidad(String(entity.id), '', entity.cantidadN, '', '', entity.fechaLimite || new Date(), entity.fechaLimite || new Date());
    }
    static toEntity(domain: Necesidad): NecesidadEntity {
        const entity = new NecesidadEntity();
        if (domain.id && !isNaN(Number(domain.id))) entity.id = Number(domain.id);
        entity.cantidadN = domain.cantidadNecesaria || 0;
        entity.fechaLimite = domain.createdAt || new Date();
        return entity;
    }
}
