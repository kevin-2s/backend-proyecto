import { Acta } from '../../domain/entities/acta.domain.entity';
import { ActaOrmEntity } from '../entities/acta.orm-entity';
import { SolicitudMapper } from '../../../solicitudes/infrastructure/mappers/solicitud.mapper';
import { DevolucionMapper } from '../../../devoluciones/infrastructure/mappers/devolucion.mapper';

export class ActaMapper {
  static toDomain(ormEntity: ActaOrmEntity): Acta {
    return new Acta(
      ormEntity.id_acta,
      ormEntity.tipo,
      ormEntity.archivo_url,
      ormEntity.id_solicitud,
      ormEntity.id_devolucion,
      ormEntity.solicitud ? SolicitudMapper.toDomain(ormEntity.solicitud) : undefined,
      ormEntity.devolucion ? DevolucionMapper.toDomain(ormEntity.devolucion) : undefined,
    );
  }

  static toOrm(domainEntity: Partial<Acta>): ActaOrmEntity {
    const ormEntity = new ActaOrmEntity();
    if (domainEntity.id_acta !== undefined) ormEntity.id_acta = domainEntity.id_acta;
    if (domainEntity.tipo !== undefined) ormEntity.tipo = domainEntity.tipo;
    if (domainEntity.archivo_url !== undefined) ormEntity.archivo_url = domainEntity.archivo_url;
    if (domainEntity.id_solicitud !== undefined) ormEntity.id_solicitud = domainEntity.id_solicitud ?? null as any;
    if (domainEntity.id_devolucion !== undefined) ormEntity.id_devolucion = domainEntity.id_devolucion ?? null as any;
    return ormEntity;
  }
}