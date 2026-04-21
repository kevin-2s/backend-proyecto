import { Solicitud } from '../../domain/entities/solicitud.domain.entity';
import { SolicitudOrmEntity } from '../entities/solicitud.orm-entity';
import { UsuarioMapper } from '../../../usuarios/infrastructure/mappers/usuario.mapper';
import { FichaMapper } from '../../../fichas/infrastructure/mappers/ficha.mapper';

export class SolicitudMapper {
  static toDomain(ormEntity: SolicitudOrmEntity): Solicitud {
    return new Solicitud(
      ormEntity.id_solicitud,
      ormEntity.fecha,
      ormEntity.estado,
      ormEntity.tipo,
      ormEntity.observacion,
      ormEntity.id_usuario,
      ormEntity.id_usuario_aprueba,
      ormEntity.id_ficha,
      ormEntity.usuario ? UsuarioMapper.toDomain(ormEntity.usuario) : undefined,
      ormEntity.usuario_aprueba ? UsuarioMapper.toDomain(ormEntity.usuario_aprueba) : undefined,
      ormEntity.ficha ? FichaMapper.toDomain(ormEntity.ficha) : undefined,
    );
  }

  static toEntity(domainEntity: Partial<Solicitud>): SolicitudOrmEntity {
    const ormEntity = new SolicitudOrmEntity();
    if (domainEntity.id_solicitud !== undefined) ormEntity.id_solicitud = domainEntity.id_solicitud;
    if (domainEntity.fecha !== undefined) ormEntity.fecha = domainEntity.fecha;
    if (domainEntity.estado !== undefined) ormEntity.estado = domainEntity.estado;
    if (domainEntity.tipo !== undefined) ormEntity.tipo = domainEntity.tipo;
    if (domainEntity.observacion !== undefined) ormEntity.observacion = domainEntity.observacion;
    if (domainEntity.id_usuario !== undefined) ormEntity.id_usuario = domainEntity.id_usuario;
    if (domainEntity.id_usuario_aprueba !== undefined) ormEntity.id_usuario_aprueba = domainEntity.id_usuario_aprueba ?? null as any;
    if (domainEntity.id_ficha !== undefined) ormEntity.id_ficha = domainEntity.id_ficha ?? null as any;
    return ormEntity;
  }
}
