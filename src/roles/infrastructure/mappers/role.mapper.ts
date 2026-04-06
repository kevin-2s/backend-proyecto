import { Role } from '../../domain/entities/role.entity';
import { RoleEntity } from '../entities/role.typeorm.entity';

export class RoleMapper {
    static toDomain(entity: RoleEntity): Role {
        return {
            id: Number(entity.id),
            nombreRol: entity.nombreRol
        } as unknown as Role;
    }
    static toEntity(domain: any): RoleEntity {
        const entity = new RoleEntity();
        if (domain.id && !isNaN(Number(domain.id))) entity.id = Number(domain.id);
        entity.nombreRol = domain.nombreRol || '';
        return entity;
    }
}
