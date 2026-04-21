import { Usuario } from '../../entities/usuario.domain.entity';

export const USUARIOS_REPOSITORY = Symbol('USUARIOS_REPOSITORY');

export interface IUsuariosRepository {
  findAll(): Promise<Usuario[]>;
  findById(id: number): Promise<Usuario | null>;
  create(usuario: Omit<Usuario, 'id_usuario' | 'estado' | 'rol' | 'setPassword' | 'getPassword'> & { password?: string }): Promise<Usuario>;
  update(id: number, usuario: Partial<Omit<Usuario, 'id_usuario' | 'rol' | 'setPassword' | 'getPassword'> & { password?: string }>): Promise<Usuario>;
}
