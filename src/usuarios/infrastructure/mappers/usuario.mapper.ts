import { Usuario } from '../../domain/entities/usuario.domain.entity';
import { UsuarioOrmEntity } from '../entities/usuario.orm-entity';
import { RolMapper } from '../../../roles/infrastructure/mappers/rol.mapper';

export class UsuarioMapper {
  static toDomain(ormEntity: UsuarioOrmEntity): Usuario {
    return new Usuario(
      ormEntity.id_usuario,
      ormEntity.nombre,
      ormEntity.correo,
      ormEntity.password,
      ormEntity.estado,
      ormEntity.id_rol,
      ormEntity.rol ? RolMapper.toDomain(ormEntity.rol) : undefined,
    );
  }

  static toDomainWithoutPassword(ormEntity: UsuarioOrmEntity): Omit<Usuario, 'password'> {
    const { password, ...usuarioSinPassword } = UsuarioMapper.toDomain(ormEntity);
    return usuarioSinPassword;
  }

  static toOrm(domainEntity: Partial<Usuario>): UsuarioOrmEntity {
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
    if (domainEntity.password !== undefined) {
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
