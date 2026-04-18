import { Kardex } from '../../domain/entities/kardex.domain.entity';
import { KardexOrmEntity } from '../entities/kardex.orm-entity';
import { ItemMapper } from '../../../items/infrastructure/mappers/item.mapper';
import { UsuarioMapper } from '../../../usuarios/infrastructure/mappers/usuario.mapper';

export class KardexMapper {
  static toDomain(ormEntity: KardexOrmEntity): Kardex {
    return new Kardex(
      ormEntity.id_kardex,
      ormEntity.tipo,
      ormEntity.cantidad,
      ormEntity.saldo_anterior,
      ormEntity.saldo_actual,
      ormEntity.fecha,
      ormEntity.observacion,
      ormEntity.id_item,
      ormEntity.id_usuario,
      ormEntity.item ? ItemMapper.toDomain(ormEntity.item) : undefined,
      ormEntity.usuario ? UsuarioMapper.toDomain(ormEntity.usuario) : undefined,
    );
  }

  static toOrm(domainEntity: Partial<Kardex>): KardexOrmEntity {
    const ormEntity = new KardexOrmEntity();
    if (domainEntity.id_kardex !== undefined) ormEntity.id_kardex = domainEntity.id_kardex;
    if (domainEntity.tipo !== undefined) ormEntity.tipo = domainEntity.tipo;
    if (domainEntity.cantidad !== undefined) ormEntity.cantidad = domainEntity.cantidad;
    if (domainEntity.saldo_anterior !== undefined) ormEntity.saldo_anterior = domainEntity.saldo_anterior;
    if (domainEntity.saldo_actual !== undefined) ormEntity.saldo_actual = domainEntity.saldo_actual;
    if (domainEntity.fecha !== undefined) ormEntity.fecha = domainEntity.fecha;
    if (domainEntity.observacion !== undefined) ormEntity.observacion = domainEntity.observacion;
    if (domainEntity.id_item !== undefined) ormEntity.id_item = domainEntity.id_item;
    if (domainEntity.id_usuario !== undefined) ormEntity.id_usuario = domainEntity.id_usuario;
    return ormEntity;
  }
}
