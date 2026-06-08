import { Sede } from '../../domain/entities/sede.domain.entity';
import { SedeOrmEntity } from '../entities/sede.orm-entity';
import { CentroMapper } from '../../../centros/infrastructure/mappers/centro.mapper';

export class SedeMapper {
  static toDomain(ormEntity: SedeOrmEntity): Sede {
    return new Sede(
      ormEntity.id_sede,
      ormEntity.nombre,
      ormEntity.direccion,
      ormEntity.id_centro,
      ormEntity.centro ? CentroMapper.toDomain(ormEntity.centro) : undefined,
      ormEntity.estado,
    );
  }

  static toEntity(domainEntity: Partial<Sede>): SedeOrmEntity {
    const ormEntity = new SedeOrmEntity();
    if (domainEntity.id_sede !== undefined) ormEntity.id_sede = domainEntity.id_sede;
    if (domainEntity.nombre !== undefined) ormEntity.nombre = domainEntity.nombre;
    if (domainEntity.direccion !== undefined) ormEntity.direccion = domainEntity.direccion;
    if (domainEntity.id_centro !== undefined) ormEntity.id_centro = domainEntity.id_centro;
    if (domainEntity.estado !== undefined) ormEntity.estado = domainEntity.estado;
    return ormEntity;
  }
}
