import { Ficha } from '../../domain/entities/ficha.domain.entity';
import { FichaOrmEntity } from '../entities/ficha.orm-entity';
import { UsuarioMapper } from '../../../usuarios/infrastructure/mappers/usuario.mapper';

export class FichaMapper {
  static toDomain(ormEntity: FichaOrmEntity): Ficha {
    return new Ficha(
      ormEntity.id_ficha,
      ormEntity.numero_ficha,
      ormEntity.programa,
      ormEntity.id_responsable,
      ormEntity.responsable ? UsuarioMapper.toDomain(ormEntity.responsable) : undefined,
    );
  }

  static toEntity(domainEntity: Partial<Ficha>): FichaOrmEntity {
    const ormEntity = new FichaOrmEntity();
    if (domainEntity.id_ficha !== undefined) ormEntity.id_ficha = domainEntity.id_ficha;
    if (domainEntity.numero_ficha !== undefined) ormEntity.numero_ficha = domainEntity.numero_ficha;
    if (domainEntity.programa !== undefined) ormEntity.programa = domainEntity.programa;
    if (domainEntity.id_responsable !== undefined) ormEntity.id_responsable = domainEntity.id_responsable ?? null as any;
    return ormEntity;
  }
}
