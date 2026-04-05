import { Usuario } from '../../domain/entities/usuario.entity';
import { UsuarioEntity } from '../entities/usuario.typeorm.entity';
import { RoleEntity } from '../../../roles/infrastructure/entities/role.typeorm.entity';

export class UsuarioMapper {
    static toDomain(entity: UsuarioEntity): Usuario {
        return new Usuario(
            String(entity.id),
            entity.correo,
            entity.contrasena,
            entity.nombreCompleto?.split(' ')[0] || '',
            entity.nombreCompleto?.split(' ')[1] || '',
            entity.rol ? String(entity.rol.id) : '',
            new Date(),
            new Date()
        );
    }
    static toEntity(domain: Usuario): UsuarioEntity {
        const entity = new UsuarioEntity();
        if (domain.id && !isNaN(Number(domain.id))) entity.id = Number(domain.id);
        entity.correo = domain.email || '';
        entity.contrasena = domain.passwordHash || '';
        entity.nombreCompleto = `${domain.nombres || ''} ${domain.apellidos || ''}`.trim() || 'Unknown';
        entity.estado = true;
        if (domain.rolId && !isNaN(Number(domain.rolId))) {
            entity.rol = new RoleEntity();
            entity.rol.id = Number(domain.rolId);
        }
        return entity;
    }
}
