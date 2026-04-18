import { ItemChequeo } from '../../domain/entities/item-chequeo.domain.entity';
import { ItemChequeoOrmEntity } from '../entities/item-chequeo.orm-entity';
import { ChequeoMapper } from '../../../chequeos/infrastructure/mappers/chequeo.mapper';
import { ItemMapper } from '../../../items/infrastructure/mappers/item.mapper';

export class ItemChequeoMapper {
  static toDomain(ormEntity: ItemChequeoOrmEntity): ItemChequeo {
    return new ItemChequeo(
      ormEntity.id_item_chequeo,
      ormEntity.estado_encontrado,
      ormEntity.id_chequeo,
      ormEntity.id_item,
      ormEntity.chequeo ? ChequeoMapper.toDomain(ormEntity.chequeo) : undefined,
      ormEntity.item ? ItemMapper.toDomain(ormEntity.item) : undefined,
    );
  }

  static toOrm(domainEntity: Partial<ItemChequeo>): ItemChequeoOrmEntity {
    const ormEntity = new ItemChequeoOrmEntity();
    if (domainEntity.id_item_chequeo !== undefined) ormEntity.id_item_chequeo = domainEntity.id_item_chequeo;
    if (domainEntity.estado_encontrado !== undefined) ormEntity.estado_encontrado = domainEntity.estado_encontrado;
    if (domainEntity.id_chequeo !== undefined) ormEntity.id_chequeo = domainEntity.id_chequeo;
    if (domainEntity.id_item !== undefined) ormEntity.id_item = domainEntity.id_item;
    return ormEntity;
  }
}
