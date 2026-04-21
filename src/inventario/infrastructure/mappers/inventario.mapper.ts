import { Inventario } from '../../domain/entities/inventario.domain.entity';
import { InventarioOrmEntity } from '../entities/inventario.orm-entity';
import { ItemMapper } from '../../../items/infrastructure/mappers/item.mapper';
import { SitioMapper } from '../../../sitios/infrastructure/mappers/sitio.mapper';

export class InventarioMapper {
  static toDomain(ormEntity: InventarioOrmEntity): Inventario {
    return new Inventario(
      ormEntity.id_inventario,
      ormEntity.estado,
      ormEntity.id_item,
      ormEntity.id_sitio,
      ormEntity.item ? ItemMapper.toDomain(ormEntity.item) : undefined,
      ormEntity.sitio ? SitioMapper.toDomain(ormEntity.sitio) : undefined,
    );
  }

  static toEntity(domainEntity: Partial<Inventario>): InventarioOrmEntity {
    const ormEntity = new InventarioOrmEntity();
    if (domainEntity.id_inventario !== undefined) ormEntity.id_inventario = domainEntity.id_inventario;
    if (domainEntity.estado !== undefined) ormEntity.estado = domainEntity.estado;
    if (domainEntity.id_item !== undefined) ormEntity.id_item = domainEntity.id_item;
    if (domainEntity.id_sitio !== undefined) ormEntity.id_sitio = domainEntity.id_sitio;
    return ormEntity;
  }
}
