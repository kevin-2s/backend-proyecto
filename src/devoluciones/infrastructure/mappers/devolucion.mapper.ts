import { Devolucion } from '../../domain/entities/devolucion.entity';
import { DevolucionEntity } from '../entities/devolucion.typeorm.entity';

export class DevolucionMapper {
    static toDomain(entity: DevolucionEntity): Devolucion {
        return new Devolucion(
            entity.id,
            entity.asignacionId,
            entity.cantidadDevuelta,
            entity.estadoFisico,
            entity.createdAt,
            entity.updatedAt
        );
    }

    static toEntity(domain: Devolucion): DevolucionEntity {
        const entity = new DevolucionEntity();
        if (domain.id) entity.id = domain.id;
        entity.asignacionId = domain.asignacionId;
        entity.cantidadDevuelta = domain.cantidadDevuelta;
        entity.estadoFisico = domain.estadoFisico;
        return entity;
    }
}
