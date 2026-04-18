import { Item } from '../../domain/entities/item.domain.entity';
import { ItemOrmEntity } from '../entities/item.orm-entity';
import { ProductoMapper } from '../../../productos/infrastructure/mappers/producto.mapper';

export class ItemMapper {
  static toDomain(ormEntity: ItemOrmEntity): Item {
    return new Item(
      ormEntity.id_item,
      ormEntity.codigo_sku,
      ormEntity.estado,
      ormEntity.id_producto,
      ormEntity.producto ? ProductoMapper.toDomain(ormEntity.producto) : undefined,
    );
  }

  static toOrm(domainEntity: Partial<Item>): ItemOrmEntity {
    const ormEntity = new ItemOrmEntity();
    if (domainEntity.id_item !== undefined) ormEntity.id_item = domainEntity.id_item;
    if (domainEntity.codigo_sku !== undefined) ormEntity.codigo_sku = domainEntity.codigo_sku;
    if (domainEntity.estado !== undefined) ormEntity.estado = domainEntity.estado;
    if (domainEntity.id_producto !== undefined) ormEntity.id_producto = domainEntity.id_producto;
    return ormEntity;
  }
}
