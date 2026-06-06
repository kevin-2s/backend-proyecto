import { Centro } from '../../domain/entities/centro.domain.entity';
import { CentroOrmEntity } from '../entities/centro.orm-entity';

export class CentroMapper {
  static toDomain(ormEntity: CentroOrmEntity): Centro {
    return new Centro(
      ormEntity.id_centro,
      ormEntity.nombre,
      ormEntity.estado,
    );
  }

  static toEntity(domainEntity: Partial<Centro>): CentroOrmEntity {
    const ormEntity = new CentroOrmEntity();
    if (domainEntity.id_centro !== undefined) ormEntity.id_centro = domainEntity.id_centro;
    if (domainEntity.nombre !== undefined) ormEntity.nombre = domainEntity.nombre;
    if (domainEntity.estado !== undefined) ormEntity.estado = domainEntity.estado;
    return ormEntity;
  }
}
