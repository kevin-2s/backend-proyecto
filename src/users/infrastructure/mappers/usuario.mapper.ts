import { Usuario } from '../../domain/entities/usuario.entity';
import { UsuarioEntity } from '../entities/usuario.typeorm.entity';
import { RoleEntity } from '../../../roles/infrastructure/entities/role.typeorm.entity';

export class UsuarioMapper {
    static toDomain(entity: UsuarioEntity): Usuario {
        return new Usuario(
            Number(entity.id),
            entity.nombreCompleto,
            entity.correo,
            entity.contrasena,
            entity.estado,
            entity.rol ? Number(entity.rol.id) : 0
        );
    }
    static toEntity(domain: any): UsuarioEntity {
        const entity = new UsuarioEntity();
        if (domain.id && !isNaN(Number(domain.id))) entity.id = Number(domain.id);
        entity.correo = domain.correo || '';
        entity.contrasena = domain.contrasena || '';
        entity.nombreCompleto = domain.nombreCompleto || 'Unknown';
        entity.estado = domain.estado !== undefined ? domain.estado : true;
        if (domain.rolId && !isNaN(Number(domain.rolId))) {
            entity.rol = new RoleEntity();
            entity.rol.id = Number(domain.rolId);
        }
        return entity;
    }
}
