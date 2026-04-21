import { Movimiento } from '../../domain/entities/movimiento.domain.entity';
import { MovimientoOrmEntity } from '../entities/movimiento.orm-entity';
import { ItemMapper } from '../../../items/infrastructure/mappers/item.mapper';
import { TipoMovimientoMapper } from '../../../tipos-movimiento/infrastructure/mappers/tipo-movimiento.mapper';
import { UsuarioMapper } from '../../../usuarios/infrastructure/mappers/usuario.mapper';

export class MovimientoMapper {
  static toDomain(ormEntity: MovimientoOrmEntity): Movimiento {
    return new Movimiento(
      ormEntity.id_movimiento,
      ormEntity.fecha,
      ormEntity.observacion,
      ormEntity.id_item,
      ormEntity.id_tipo_movimiento,
      ormEntity.id_usuario,
      ormEntity.item ? ItemMapper.toDomain(ormEntity.item) : undefined,
      ormEntity.tipoMovimiento ? TipoMovimientoMapper.toDomain(ormEntity.tipoMovimiento) : undefined,
      ormEntity.usuario ? UsuarioMapper.toDomain(ormEntity.usuario) : undefined,
    );
  }

  static toEntity(domainEntity: Partial<Movimiento>): MovimientoOrmEntity {
    const ormEntity = new MovimientoOrmEntity();
    if (domainEntity.id_movimiento !== undefined) ormEntity.id_movimiento = domainEntity.id_movimiento;
    if (domainEntity.fecha !== undefined) ormEntity.fecha = domainEntity.fecha;
    if (domainEntity.observacion !== undefined) ormEntity.observacion = domainEntity.observacion;
    if (domainEntity.id_item !== undefined) ormEntity.id_item = domainEntity.id_item;
    if (domainEntity.id_tipo_movimiento !== undefined) ormEntity.id_tipo_movimiento = domainEntity.id_tipo_movimiento;
    if (domainEntity.id_usuario !== undefined) ormEntity.id_usuario = domainEntity.id_usuario;
    return ormEntity;
  }
}
