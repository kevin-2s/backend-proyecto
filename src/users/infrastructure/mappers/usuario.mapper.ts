import { Usuario } from '../../domain/entities/usuario.entity';
import { UsuarioEntity } from '../entities/usuario.typeorm.entity';

export class UsuarioMapper {
    static toDomain(entity: UsuarioEntity): Usuario {
        return new Usuario(
            entity.id,
            entity.email,
            entity.passwordHash,
            entity.nombres,
            entity.apellidos,
            entity.rolId,
            entity.createdAt,
            entity.updatedAt
        );
    }

    static toEntity(domain: Usuario): UsuarioEntity {
        const entity = new UsuarioEntity();
        if (domain.id) entity.id = domain.id;
        entity.email = domain.email;
        entity.passwordHash = domain.passwordHash;
        entity.nombres = domain.nombres;
        entity.apellidos = domain.apellidos;
        entity.rolId = domain.rolId;
        return entity;
    }
}
