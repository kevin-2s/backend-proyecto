import { Movimiento } from '../../domain/entities/movimiento.entity';
import { MovimientoEntity } from '../entities/movimiento.typeorm.entity';

export class MovimientoMapper {
    static toDomain(entity: MovimientoEntity): Movimiento {
        return new Movimiento(
            entity.id,
            entity.tipoMovimiento,
            entity.productoId,
            entity.cantidad,
            entity.sitioOrigenId,
            entity.sitioDestinoId,
            entity.usuarioId,
            entity.createdAt,
            entity.updatedAt
        );
    }

    static toEntity(domain: Movimiento): MovimientoEntity {
        const entity = new MovimientoEntity();
        if (domain.id) entity.id = domain.id;
        entity.tipoMovimiento = domain.tipoMovimiento;
        entity.productoId = domain.productoId;
        entity.cantidad = domain.cantidad;
        entity.sitioOrigenId = domain.sitioOrigenId;
        entity.sitioDestinoId = domain.sitioDestinoId;
        entity.usuarioId = domain.usuarioId;
        return entity;
    }
}
