import { Devolucion } from "../../domain/entities/devolucion.domain.entity";
import { DevolucionOrmEntity } from "../entities/devolucion.orm-entity";
import { SolicitudMapper } from "../../../solicitudes/infrastructure/mappers/solicitud.mapper";

export class DevolucionMapper {
  static toDomain(ormEntity: DevolucionOrmEntity): Devolucion {
    return new Devolucion(
      ormEntity.id_devolucion,
      ormEntity.fecha,
      ormEntity.estado,
      ormEntity.observacion,
      ormEntity.id_solicitud,
      ormEntity.id_item,
      ormEntity.solicitud
        ? SolicitudMapper.toDomain(ormEntity.solicitud)
        : undefined,
    );
  }

  static toEntity(domainEntity: Partial<Devolucion>): DevolucionOrmEntity {
    const ormEntity = new DevolucionOrmEntity();
    if (domainEntity.id_devolucion !== undefined)
      ormEntity.id_devolucion = domainEntity.id_devolucion;
    if (domainEntity.fecha !== undefined) ormEntity.fecha = domainEntity.fecha;
    if (domainEntity.estado !== undefined)
      ormEntity.estado = domainEntity.estado;
    if (domainEntity.observacion !== undefined)
      ormEntity.observacion = domainEntity.observacion;
    if (domainEntity.id_solicitud !== undefined)
      ormEntity.id_solicitud = domainEntity.id_solicitud;
    if (domainEntity.id_item !== undefined)
      ormEntity.id_item = domainEntity.id_item;
    return ormEntity;
  }
}
