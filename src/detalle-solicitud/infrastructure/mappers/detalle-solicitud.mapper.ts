import { DetalleSolicitud } from '../../domain/entities/detalle-solicitud.domain.entity';
import { DetalleSolicitudOrmEntity } from '../entities/detalle-solicitud.orm-entity';
import { SolicitudMapper } from '../../../solicitudes/infrastructure/mappers/solicitud.mapper';
import { ProductoMapper } from '../../../productos/infrastructure/mappers/producto.mapper';

export class DetalleSolicitudMapper {
  static toDomain(ormEntity: DetalleSolicitudOrmEntity): DetalleSolicitud {
    return new DetalleSolicitud(
      ormEntity.id_detalle,
      ormEntity.cantidad,
      ormEntity.id_solicitud,
      ormEntity.id_producto,
      ormEntity.solicitud ? SolicitudMapper.toDomain(ormEntity.solicitud) : undefined,
      ormEntity.producto ? ProductoMapper.toDomain(ormEntity.producto) : undefined,
    );
  }

  static toOrm(domainEntity: Partial<DetalleSolicitud>): DetalleSolicitudOrmEntity {
    const ormEntity = new DetalleSolicitudOrmEntity();
    if (domainEntity.id_detalle !== undefined) ormEntity.id_detalle = domainEntity.id_detalle;
    if (domainEntity.cantidad !== undefined) ormEntity.cantidad = domainEntity.cantidad;
    if (domainEntity.id_solicitud !== undefined) ormEntity.id_solicitud = domainEntity.id_solicitud;
    if (domainEntity.id_producto !== undefined) ormEntity.id_producto = domainEntity.id_producto;
    return ormEntity;
  }
}
