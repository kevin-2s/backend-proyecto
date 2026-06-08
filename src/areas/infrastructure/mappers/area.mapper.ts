import { Area } from '../../domain/entities/area.domain.entity';
import { AreaOrmEntity } from '../entities/area.orm-entity';

export class AreaMapper {
  static toDomain(ormEntity: AreaOrmEntity): Area {
    return new Area(
      ormEntity.id_area,
      ormEntity.nombre,
      ormEntity.estado,
    );
  }

  static toEntity(domainEntity: Partial<Area>): AreaOrmEntity {
    const ormEntity = new AreaOrmEntity();
    if (domainEntity.id_area !== undefined) ormEntity.id_area = domainEntity.id_area;
    if (domainEntity.nombre !== undefined) ormEntity.nombre = domainEntity.nombre;
    if (domainEntity.estado !== undefined) ormEntity.estado = domainEntity.estado;
    return ormEntity;
  }
}
