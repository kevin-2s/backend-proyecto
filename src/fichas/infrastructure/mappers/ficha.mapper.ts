import { Ficha } from '../../domain/entities/ficha.domain.entity';
import { FichaOrmEntity } from '../entities/ficha.orm-entity';
import { UsuarioMapper } from '../../../usuarios/infrastructure/mappers/usuario.mapper';
import { ProgramaMapper } from '../../../programas/infrastructure/mappers/programa.mapper';

export class FichaMapper {
  static toDomain(ormEntity: FichaOrmEntity): Ficha {
    return new Ficha(
      ormEntity.id_ficha,
      ormEntity.numero_ficha,
      ormEntity.id_programa,
      ormEntity.programa ? ProgramaMapper.toDomain(ormEntity.programa) : undefined,
      ormEntity.id_responsable,
      ormEntity.responsable ? UsuarioMapper.toDomain(ormEntity.responsable) : undefined,
      ormEntity.ambiente,
      ormEntity.estado,
    );
  }

  static toEntity(domainEntity: Partial<Ficha>): FichaOrmEntity {
    const ormEntity = new FichaOrmEntity();
    if (domainEntity.id_ficha !== undefined) ormEntity.id_ficha = domainEntity.id_ficha;
    if (domainEntity.numero_ficha !== undefined) ormEntity.numero_ficha = domainEntity.numero_ficha;
    if (domainEntity.id_programa !== undefined) ormEntity.id_programa = domainEntity.id_programa;
    if (domainEntity.id_responsable !== undefined) {
      ormEntity.id_responsable = domainEntity.id_responsable ?? null as any;
      ormEntity.responsable = domainEntity.id_responsable ? ({ id_usuario: domainEntity.id_responsable } as any) : null;
    }
    if (domainEntity.ambiente !== undefined) {
      ormEntity.ambiente = domainEntity.ambiente;
    }
    if (domainEntity.estado !== undefined) {
      ormEntity.estado = domainEntity.estado;
    }
    return ormEntity;
  }
}
