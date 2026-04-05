import { Inventario } from '../../domain/entities/inventario.entity';
import { InventarioEntity } from '../entities/inventario.typeorm.entity';
import { ProductoEntity } from '../../../productos/infrastructure/entities/producto.typeorm.entity';
import { SitioEntity } from '../../../sitios/infrastructure/entities/sitio.typeorm.entity';

export class InventarioMapper {
    static toDomain(entity: InventarioEntity): Inventario {
        return new Inventario(
            Number(entity.id),
            entity.cantidadActual,
            entity.stockMinimo,
            entity.producto ? Number(entity.producto.id) : 0,
            entity.sitio ? Number(entity.sitio.id) : 0
        );
    }
    static toEntity(domain: any): InventarioEntity {
        const entity = new InventarioEntity();
        if (domain.id && !isNaN(Number(domain.id))) entity.id = Number(domain.id);
        entity.cantidadActual = domain.cantidadActual || 0;
        entity.stockMinimo = domain.stockMinimo || 0;

        if (domain.productoId && !isNaN(Number(domain.productoId))) {
            entity.producto = new ProductoEntity();
            entity.producto.id = Number(domain.productoId);
        }
        
        if (domain.sitioId && !isNaN(Number(domain.sitioId))) {
            entity.sitio = new SitioEntity();
            entity.sitio.id = Number(domain.sitioId);
        }

        return entity;
    }
}
