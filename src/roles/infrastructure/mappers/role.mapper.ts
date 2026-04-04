import { Role } from '../../domain/entities/role.entity';
import { RoleEntity } from '../entities/role.typeorm.entity';

export class RoleMapper {
    static toDomain(entity: RoleEntity): Role {
        return new Role(
            entity.id,
            entity.name,
            entity.description,
            entity.createdAt,
            entity.updatedAt
        );
    }

    static toEntity(domain: Role): RoleEntity {
        const entity = new RoleEntity();
        if (domain.id) entity.id = domain.id;
        entity.name = domain.name;
        entity.description = domain.description;
        return entity;
    }
}
