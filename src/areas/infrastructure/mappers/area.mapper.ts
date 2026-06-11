import { Area } from '../../domain/entities/area.domain.entity';
import { AreaOrmEntity } from '../entities/area.orm-entity';

export class AreaMapper {
  static toDomain(ormEntity: AreaOrmEntity): Area {
    return new Area(
      ormEntity.id_area,
      ormEntity.nombre,
      ormEntity.id_sede,
      ormEntity.sede ? { 
        id_sede: ormEntity.sede.id_sede, 
        nombre: ormEntity.sede.nombre,
        centro: ormEntity.sede.centro ? {
          id_centro: ormEntity.sede.centro.id_centro,
          nombre: ormEntity.sede.centro.nombre
        } : null
      } : null,
      ormEntity.estado,
    );
  }

  static toEntity(domainEntity: Partial<Area>): AreaOrmEntity {
    const ormEntity = new AreaOrmEntity();
    if (domainEntity.id_area !== undefined) ormEntity.id_area = domainEntity.id_area;
    if (domainEntity.nombre !== undefined) ormEntity.nombre = domainEntity.nombre;
    if (domainEntity.id_sede !== undefined) ormEntity.id_sede = domainEntity.id_sede;
    if (domainEntity.estado !== undefined) ormEntity.estado = domainEntity.estado;
    return ormEntity;
  }
}
