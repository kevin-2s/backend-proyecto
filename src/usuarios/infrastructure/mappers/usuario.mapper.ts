import { Usuario } from '../../domain/entities/usuario.domain.entity';
import { UsuarioOrmEntity } from '../entities/usuario.orm-entity';
import { RolMapper } from '../../../roles/infrastructure/mappers/rol.mapper';

export class UsuarioMapper {
  static toDomain(ormEntity: UsuarioOrmEntity): Usuario {
    return new Usuario(
      ormEntity.id_usuario,
      ormEntity.nombre,
      ormEntity.correo,
      undefined, // NUNCA incluir password en la respuesta
      ormEntity.estado,
      ormEntity.id_rol,
      ormEntity.rol ? RolMapper.toDomain(ormEntity.rol) : undefined,
    );
  }

  static toDomainWithoutPassword(ormEntity: UsuarioOrmEntity): Usuario {
    return UsuarioMapper.toDomain(ormEntity);
  }

  static toEntity(domainEntity: Partial<Usuario> & { getPassword?: () => string | undefined; password?: string }): UsuarioOrmEntity {
    const ormEntity = new UsuarioOrmEntity();
    if (domainEntity.id_usuario !== undefined) {
      ormEntity.id_usuario = domainEntity.id_usuario;
    }
    if (domainEntity.nombre !== undefined) {
      ormEntity.nombre = domainEntity.nombre;
    }
    if (domainEntity.correo !== undefined) {
      ormEntity.correo = domainEntity.correo;
    }
    
    // Soporta leer desde domain nativo o de un DTO mapeado
    if (domainEntity.getPassword && domainEntity.getPassword() !== undefined) {
      ormEntity.password = domainEntity.getPassword() as string;
    } else if (domainEntity.password !== undefined) {
      ormEntity.password = domainEntity.password;
    }

    if (domainEntity.estado !== undefined) {
      ormEntity.estado = domainEntity.estado;
    }
    if (domainEntity.id_rol !== undefined) {
      ormEntity.id_rol = domainEntity.id_rol;
    }
    return ormEntity;
  }
}
