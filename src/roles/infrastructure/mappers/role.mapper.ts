import { Role } from '../../domain/entities/role.entity';
import { RoleEntity } from '../entities/role.typeorm.entity';

export class RoleMapper {
    static toDomain(entity: RoleEntity): Role {
        return new Role(String(entity.id), entity.nombreRol, '', new Date(), new Date());
    }
    static toEntity(domain: Role): RoleEntity {
        const entity = new RoleEntity();
        if (domain.id && !isNaN(Number(domain.id))) entity.id = Number(domain.id);
        entity.nombreRol = domain.name || '';
        return entity;
    }
}
