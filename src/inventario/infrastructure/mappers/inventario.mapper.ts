import { Inventario } from '../../domain/entities/inventario.entity';
import { InventarioEntity } from '../entities/inventario.typeorm.entity';

export class InventarioMapper {
    static toDomain(entity: InventarioEntity): Inventario {
        return new Inventario(String(entity.id), '', '', entity.cantidadActual, new Date(), new Date());
    }
    static toEntity(domain: Inventario): InventarioEntity {
        const entity = new InventarioEntity();
        if (domain.id && !isNaN(Number(domain.id))) entity.id = Number(domain.id);
        entity.cantidadActual = domain.cantidad || 0;
        entity.stockMinimo = 0;
        return entity;
    }
}
