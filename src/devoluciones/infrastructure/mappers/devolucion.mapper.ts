import { Devolucion } from '../../domain/entities/devolucion.domain.entity';
import { DevolucionOrmEntity } from '../entities/devolucion.orm-entity';
import { SolicitudMapper } from '../../../solicitudes/infrastructure/mappers/solicitud.mapper';
import { UsuarioMapper } from '../../../usuarios/infrastructure/mappers/usuario.mapper';

export class DevolucionMapper {
  static toDomain(ormEntity: DevolucionOrmEntity): Devolucion {
    return new Devolucion(
      ormEntity.id_devolucion,
      ormEntity.fecha,
      ormEntity.id_solicitud,
      ormEntity.id_usuario_recibe,
      ormEntity.solicitud ? SolicitudMapper.toDomain(ormEntity.solicitud) : undefined,
      ormEntity.usuario_recibe ? UsuarioMapper.toDomain(ormEntity.usuario_recibe) : undefined,
    );
  }

  static toOrm(domainEntity: Partial<Devolucion>): DevolucionOrmEntity {
    const ormEntity = new DevolucionOrmEntity();
    if (domainEntity.id_devolucion !== undefined) ormEntity.id_devolucion = domainEntity.id_devolucion;
    if (domainEntity.fecha !== undefined) ormEntity.fecha = domainEntity.fecha;
    if (domainEntity.id_solicitud !== undefined) ormEntity.id_solicitud = domainEntity.id_solicitud;
    if (domainEntity.id_usuario_recibe !== undefined) ormEntity.id_usuario_recibe = domainEntity.id_usuario_recibe;
    return ormEntity;
  }
}