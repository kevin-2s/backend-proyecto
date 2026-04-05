import { Producto } from '../../domain/entities/producto.entity';
import { ProductoEntity } from '../entities/producto.typeorm.entity';

export class ProductoMapper {
    static toDomain(entity: ProductoEntity): Producto {
        return new Producto(String(entity.id), entity.nombre, entity.descripcion, '', 0, new Date(), new Date());
    }
    static toEntity(domain: Producto): ProductoEntity {
        const entity = new ProductoEntity();
        if (domain.id && !isNaN(Number(domain.id))) entity.id = Number(domain.id);
        entity.nombre = domain.nombre || '';
        entity.descripcion = domain.descripcion || '';
        entity.codigoUNSPSC = '';
        entity.SKU = '';
        entity.imagenUrl = '';
        return entity;
    }
}
