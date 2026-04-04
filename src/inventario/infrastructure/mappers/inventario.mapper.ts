import { Inventario } from '../../domain/entities/inventario.entity';
import { InventarioEntity } from '../entities/inventario.typeorm.entity';

export class InventarioMapper {
    static toDomain(entity: InventarioEntity): Inventario {
        return new Inventario(
            entity.id,
            entity.productoId,
            entity.sitioId,
            entity.cantidad,
            entity.createdAt,
            entity.updatedAt
        );
    }

    static toEntity(domain: Inventario): InventarioEntity {
        const entity = new InventarioEntity();
        if (domain.id) entity.id = domain.id;
        entity.productoId = domain.productoId;
        entity.sitioId = domain.sitioId;
        entity.cantidad = domain.cantidad;
        return entity;
    }
}
