import { Producto } from '../../domain/entities/producto.entity';
import { ProductoEntity } from '../entities/producto.typeorm.entity';

export class ProductoMapper {
    static toDomain(entity: ProductoEntity): Producto {
        return new Producto(
            Number(entity.id),
            entity.nombre,
            entity.descripcion,
            entity.codigoUNSPSC,
            entity.SKU,
            entity.imagenUrl,
            entity.categoria ? Number(entity.categoria.id) : 0
        );
    }
    static toEntity(domain: Producto): ProductoEntity {
        const entity = new ProductoEntity();
        if (domain.id && !isNaN(Number(domain.id))) entity.id = Number(domain.id);
        entity.nombre = domain.nombre || '';
        entity.descripcion = domain.descripcion || '';
        entity.codigoUNSPSC = domain.codigoUNSPSC || '';
        entity.SKU = domain.SKU || '';
        entity.imagenUrl = domain.imagenUrl || '';
        if (domain.categoriaId) {
            entity.categoria = { id: domain.categoriaId } as any;
        }
        return entity;
    }
}
