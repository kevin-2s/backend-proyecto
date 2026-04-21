import { Chequeo } from "../../domain/entities/chequeo.domain.entity";
import { ChequeoOrmEntity } from "../entities/chequeo.orm-entity";
import { UsuarioMapper } from "../../../usuarios/infrastructure/mappers/usuario.mapper";

export class ChequeoMapper {
  static toDomain(ormEntity: ChequeoOrmEntity): Chequeo {
    return new Chequeo(
      ormEntity.id_chequeo,
      ormEntity.fecha,
      ormEntity.id_usuario,
      ormEntity.id_solicitud,
      ormEntity.usuario ? UsuarioMapper.toDomain(ormEntity.usuario) : undefined,
    );
  }

  static toEntity(domainEntity: Partial<Chequeo>): ChequeoOrmEntity {
    const ormEntity = new ChequeoOrmEntity();
    if (domainEntity.id_chequeo !== undefined)
      ormEntity.id_chequeo = domainEntity.id_chequeo;
    if (domainEntity.fecha !== undefined) ormEntity.fecha = domainEntity.fecha;
    if (domainEntity.id_usuario !== undefined)
      ormEntity.id_usuario = domainEntity.id_usuario;
    if (domainEntity.id_solicitud !== undefined)
      ormEntity.id_solicitud = domainEntity.id_solicitud;
    return ormEntity;
  }
}
