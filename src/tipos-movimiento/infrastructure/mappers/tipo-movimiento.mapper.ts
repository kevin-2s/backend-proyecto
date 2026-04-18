import { TipoMovimiento } from '../../domain/entities/tipo-movimiento.domain.entity';
import { TipoMovimientoOrmEntity } from '../entities/tipo-movimiento.orm-entity';

export class TipoMovimientoMapper {
  static toDomain(ormEntity: TipoMovimientoOrmEntity): TipoMovimiento {
    return new TipoMovimiento(ormEntity.id_tipo_movimiento, ormEntity.nombre);
  }

  static toOrm(domainEntity: Partial<TipoMovimiento>): TipoMovimientoOrmEntity {
    const ormEntity = new TipoMovimientoOrmEntity();
    if (domainEntity.id_tipo_movimiento !== undefined) ormEntity.id_tipo_movimiento = domainEntity.id_tipo_movimiento;
    if (domainEntity.nombre !== undefined) ormEntity.nombre = domainEntity.nombre;
    return ormEntity;
  }
}
