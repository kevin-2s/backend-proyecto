import { Movimiento } from '../../domain/entities/movimiento.entity';
import { MovimientoEntity } from '../entities/movimiento.typeorm.entity';
import { TipoMovimiento } from '../../../shared/domain/enums';

export class MovimientoMapper {
    static toDomain(entity: MovimientoEntity): Movimiento {
        return new Movimiento(String(entity.id), String(entity.tipo) || '', '', 1, '', '', '', entity.fecha || new Date(), entity.fecha || new Date());
    }
    static toEntity(domain: Movimiento): MovimientoEntity {
        const entity = new MovimientoEntity();
        if (domain.id && !isNaN(Number(domain.id))) entity.id = Number(domain.id);
        entity.tipo = TipoMovimiento.ENTRADA;
        entity.cantidad = 1;
        entity.fecha = domain.createdAt || new Date();
        return entity;
    }
}
