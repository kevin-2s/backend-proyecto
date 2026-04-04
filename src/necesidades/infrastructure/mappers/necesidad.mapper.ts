import { Necesidad } from '../../domain/entities/necesidad.entity';
import { NecesidadEntity } from '../entities/necesidad.typeorm.entity';

export class NecesidadMapper {
    static toDomain(entity: NecesidadEntity): Necesidad {
        return new Necesidad(
            entity.id,
            entity.productoId,
            entity.cantidadNecesaria,
            entity.justificacion,
            entity.estado,
            entity.createdAt,
            entity.updatedAt
        );
    }

    static toEntity(domain: Necesidad): NecesidadEntity {
        const entity = new NecesidadEntity();
        if (domain.id) entity.id = domain.id;
        entity.productoId = domain.productoId;
        entity.cantidadNecesaria = domain.cantidadNecesaria;
        entity.justificacion = domain.justificacion;
        entity.estado = domain.estado;
        return entity;
    }
}
