import { Producto } from '../../domain/entities/producto.entity';
import { ProductoEntity } from '../entities/producto.typeorm.entity';

export class ProductoMapper {
    static toDomain(entity: ProductoEntity): Producto {
        return new Producto(
            entity.id,
            entity.nombre,
            entity.descripcion,
            entity.categoriaId,
            entity.stockMinimo,
            entity.createdAt,
            entity.updatedAt
        );
    }

    static toEntity(domain: Producto): ProductoEntity {
        const entity = new ProductoEntity();
        if (domain.id) entity.id = domain.id;
        entity.nombre = domain.nombre;
        entity.descripcion = domain.descripcion;
        entity.categoriaId = domain.categoriaId;
        entity.stockMinimo = domain.stockMinimo;
        return entity;
    }
}
