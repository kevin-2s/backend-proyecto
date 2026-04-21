import { Acta } from "../../domain/entities/acta.domain.entity";
import { ActaOrmEntity } from "../entities/acta.orm-entity";
import { SolicitudMapper } from "../../../solicitudes/infrastructure/mappers/solicitud.mapper";

export class ActaMapper {
  static toDomain(ormEntity: ActaOrmEntity): Acta {
    return new Acta(
      ormEntity.id_acta,
      ormEntity.fecha,
      ormEntity.url_pdf,
      ormEntity.id_solicitud,
      ormEntity.id_usuario,
      ormEntity.solicitud
        ? SolicitudMapper.toDomain(ormEntity.solicitud)
        : undefined,
    );
  }

  static toEntity(domainEntity: Partial<Acta>): ActaOrmEntity {
    const ormEntity = new ActaOrmEntity();
    if (domainEntity.id_acta !== undefined)
      ormEntity.id_acta = domainEntity.id_acta;
    if (domainEntity.id_solicitud !== undefined)
      ormEntity.id_solicitud = domainEntity.id_solicitud;
    if (domainEntity.url_pdf !== undefined)
      ormEntity.url_pdf = domainEntity.url_pdf;
    if (domainEntity.id_usuario !== undefined)
      ormEntity.id_usuario = domainEntity.id_usuario;
    return ormEntity;
  }
}
