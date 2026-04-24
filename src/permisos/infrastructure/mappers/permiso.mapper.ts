import { Permiso } from '../../domain/permiso';
import { PermisoOrmEntity } from '../entities/permiso.orm-entity';

export class PermisoMapper {
  static toDomain(entity: PermisoOrmEntity): Permiso {
    return new Permiso(
      entity.id_permiso,
      entity.nombre,
      entity.descripcion,
      entity.modulo,
      entity.activo,
    );
  }

  static toOrmEntity(domain: Permiso): PermisoOrmEntity {
    const entity = new PermisoOrmEntity();
    entity.id_permiso = domain.id_permiso;
    entity.nombre = domain.nombre;
    entity.descripcion = domain.descripcion;
    entity.modulo = domain.modulo;
    entity.activo = domain.activo;
    return entity;
  }
}
