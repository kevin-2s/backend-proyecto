import { Programa } from '../../domain/entities/programa.domain.entity';
import { ProgramaOrmEntity } from '../entities/programa.orm-entity';
import { AreaMapper } from '../../../areas/infrastructure/mappers/area.mapper';

export class ProgramaMapper {
  static toDomain(ormEntity: ProgramaOrmEntity): Programa {
    return new Programa(
      ormEntity.id_programa,
      ormEntity.nombre,
      ormEntity.codigo,
      ormEntity.id_area,
      ormEntity.estado,
      ormEntity.area ? AreaMapper.toDomain(ormEntity.area) : undefined,
    );
  }

  static toEntity(domainEntity: Partial<Programa>): ProgramaOrmEntity {
    const ormEntity = new ProgramaOrmEntity();
    if (domainEntity.id_programa !== undefined) ormEntity.id_programa = domainEntity.id_programa;
    if (domainEntity.nombre !== undefined) ormEntity.nombre = domainEntity.nombre;
    if (domainEntity.codigo !== undefined) ormEntity.codigo = domainEntity.codigo;
    if (domainEntity.id_area !== undefined) ormEntity.id_area = domainEntity.id_area;
    if (domainEntity.estado !== undefined) ormEntity.estado = domainEntity.estado;
    return ormEntity;
  }
}
