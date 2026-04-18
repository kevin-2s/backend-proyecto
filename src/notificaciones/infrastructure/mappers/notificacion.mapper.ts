import { Notificacion } from '../../domain/entities/notificacion.domain.entity';
import { NotificacionOrmEntity } from '../entities/notificacion.orm-entity';
import { UsuarioMapper } from '../../../usuarios/infrastructure/mappers/usuario.mapper';

export class NotificacionMapper {
  static toDomain(ormEntity: NotificacionOrmEntity): Notificacion {
    return new Notificacion(
      ormEntity.id_notificacion,
      ormEntity.tipo,
      ormEntity.mensaje,
      ormEntity.leido,
      ormEntity.fecha,
      ormEntity.id_usuario,
      ormEntity.usuario ? UsuarioMapper.toDomain(ormEntity.usuario) : undefined,
    );
  }

  static toOrm(domainEntity: Partial<Notificacion>): NotificacionOrmEntity {
    const ormEntity = new NotificacionOrmEntity();
    if (domainEntity.id_notificacion !== undefined) ormEntity.id_notificacion = domainEntity.id_notificacion;
    if (domainEntity.tipo !== undefined) ormEntity.tipo = domainEntity.tipo;
    if (domainEntity.mensaje !== undefined) ormEntity.mensaje = domainEntity.mensaje;
    if (domainEntity.leido !== undefined) ormEntity.leido = domainEntity.leido;
    if (domainEntity.fecha !== undefined) ormEntity.fecha = domainEntity.fecha;
    if (domainEntity.id_usuario !== undefined) ormEntity.id_usuario = domainEntity.id_usuario;
    return ormEntity;
  }
}