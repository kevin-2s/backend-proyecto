import { Sitio } from '../../domain/entities/sitio.domain.entity';
import { SitioOrmEntity } from '../entities/sitio.orm-entity';
import { UsuarioMapper } from '../../../usuarios/infrastructure/mappers/usuario.mapper';
import { CentroMapper } from '../../../centros/infrastructure/mappers/centro.mapper';

export class SitioMapper {
  static toDomain(ormEntity: SitioOrmEntity): Sitio {
    return new Sitio(
      ormEntity.id_sitio,
      ormEntity.nombre,
      ormEntity.tipo,
      ormEntity.id_responsable,
      ormEntity.responsable ? UsuarioMapper.toDomain(ormEntity.responsable) : undefined,
      ormEntity.id_centro,
      ormEntity.centro ? CentroMapper.toDomain(ormEntity.centro) : undefined,
      ormEntity.estado,
    );
  }

  static toEntity(domainEntity: Partial<Sitio>): SitioOrmEntity {
    const ormEntity = new SitioOrmEntity();
    if (domainEntity.id_sitio !== undefined) ormEntity.id_sitio = domainEntity.id_sitio;
    if (domainEntity.nombre !== undefined) ormEntity.nombre = domainEntity.nombre;
    if (domainEntity.tipo !== undefined) ormEntity.tipo = domainEntity.tipo;
    if (domainEntity.id_responsable !== undefined) ormEntity.id_responsable = domainEntity.id_responsable ?? null as any;
    if (domainEntity.id_centro !== undefined) ormEntity.id_centro = domainEntity.id_centro ?? null as any;
    if (domainEntity.estado !== undefined) ormEntity.estado = domainEntity.estado;
    return ormEntity;
  }
}
