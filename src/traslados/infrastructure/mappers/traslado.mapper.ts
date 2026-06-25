import { Traslado } from '../../domain/entities/traslado.domain.entity';
import { TrasladoOrmEntity } from '../entities/traslado.orm-entity';
import { ItemMapper } from '../../../items/infrastructure/mappers/item.mapper';
import { SitioMapper } from '../../../sitios/infrastructure/mappers/sitio.mapper';
import { UsuarioMapper } from '../../../usuarios/infrastructure/mappers/usuario.mapper';

export class TrasladoMapper {
  static toDomain(ormEntity: TrasladoOrmEntity): Traslado {
    return new Traslado(
      ormEntity.id_traslado,
      ormEntity.id_item,
      ormEntity.id_sitio_origen,
      ormEntity.id_sitio_destino,
      ormEntity.id_usuario_solicita,
      ormEntity.estado,
      ormEntity.fecha_solicitud,
      ormEntity.justificacion,
      ormEntity.id_usuario_aprueba,
      ormEntity.fecha_resolucion,
      ormEntity.observacion_resolucion,
      ormEntity.item ? ItemMapper.toDomain(ormEntity.item) : undefined,
      ormEntity.sitio_origen ? SitioMapper.toDomain(ormEntity.sitio_origen) : undefined,
      ormEntity.sitio_destino ? SitioMapper.toDomain(ormEntity.sitio_destino) : undefined,
      ormEntity.usuario_solicita ? UsuarioMapper.toDomain(ormEntity.usuario_solicita) : undefined,
      ormEntity.usuario_aprueba ? UsuarioMapper.toDomain(ormEntity.usuario_aprueba) : undefined,
    );
  }

  static toEntity(domainEntity: Partial<Traslado>): TrasladoOrmEntity {
    const ormEntity = new TrasladoOrmEntity();
    if (domainEntity.id_traslado !== undefined) ormEntity.id_traslado = domainEntity.id_traslado;
    if (domainEntity.id_item !== undefined) ormEntity.id_item = domainEntity.id_item;
    if (domainEntity.id_sitio_origen !== undefined) ormEntity.id_sitio_origen = domainEntity.id_sitio_origen;
    if (domainEntity.id_sitio_destino !== undefined) ormEntity.id_sitio_destino = domainEntity.id_sitio_destino;
    if (domainEntity.id_usuario_solicita !== undefined) ormEntity.id_usuario_solicita = domainEntity.id_usuario_solicita;
    if (domainEntity.estado !== undefined) ormEntity.estado = domainEntity.estado;
    if (domainEntity.fecha_solicitud !== undefined) ormEntity.fecha_solicitud = domainEntity.fecha_solicitud;
    if (domainEntity.justificacion !== undefined) ormEntity.justificacion = domainEntity.justificacion;
    if (domainEntity.id_usuario_aprueba !== undefined) ormEntity.id_usuario_aprueba = domainEntity.id_usuario_aprueba ?? null as any;
    if (domainEntity.fecha_resolucion !== undefined) ormEntity.fecha_resolucion = domainEntity.fecha_resolucion ?? null;
    if (domainEntity.observacion_resolucion !== undefined) ormEntity.observacion_resolucion = domainEntity.observacion_resolucion ?? null;
    return ormEntity;
  }
}
