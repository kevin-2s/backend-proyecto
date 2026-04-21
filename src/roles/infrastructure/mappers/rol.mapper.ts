import { Rol } from '../../domain/entities/rol.domain.entity';
import { RolOrmEntity } from '../entities/rol.orm-entity';

export class RolMapper {
  static toDomain(ormEntity: RolOrmEntity): Rol {
    return new Rol(ormEntity.id_rol, ormEntity.nombre);
  }

  static toEntity(domainEntity: Omit<Rol, 'id_rol'> | Rol): RolOrmEntity {
    const ormEntity = new RolOrmEntity();
    if ('id_rol' in domainEntity) {
      ormEntity.id_rol = domainEntity.id_rol;
    }
    ormEntity.nombre = domainEntity.nombre;
    return ormEntity;
  }
}
