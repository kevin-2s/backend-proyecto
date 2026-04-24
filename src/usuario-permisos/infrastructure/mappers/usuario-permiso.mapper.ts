import { UsuarioPermiso } from '../../domain/usuario-permiso';
import { UsuarioPermisoOrmEntity } from '../entities/usuario-permiso.orm-entity';
import { PermisoMapper } from '../../../permisos/infrastructure/mappers/permiso.mapper';

export class UsuarioPermisoMapper {
  static toDomain(entity: UsuarioPermisoOrmEntity): UsuarioPermiso {
    return new UsuarioPermiso(
      entity.id,
      entity.id_usuario,
      entity.id_permiso,
      entity.activo,
      entity.fecha_asignacion,
      entity.permiso ? PermisoMapper.toDomain(entity.permiso) : undefined,
    );
  }

  static toOrmEntity(domain: UsuarioPermiso): UsuarioPermisoOrmEntity {
    const entity = new UsuarioPermisoOrmEntity();
    entity.id = domain.id;
    entity.id_usuario = domain.id_usuario;
    entity.id_permiso = domain.id_permiso;
    entity.activo = domain.activo;
    entity.fecha_asignacion = domain.fecha_asignacion;
    return entity;
  }
}
