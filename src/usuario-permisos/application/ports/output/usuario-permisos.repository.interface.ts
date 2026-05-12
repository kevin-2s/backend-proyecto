import { UsuarioPermiso } from '../../../domain/usuario-permiso';

export interface IUsuarioPermisosRepository {
  findAllByUserId(id_usuario: number): Promise<UsuarioPermiso[]>;
  findByUserIdAndPermisoId(id_usuario: number, id_permiso: number): Promise<UsuarioPermiso | null>;
  create(usuarioPermiso: Partial<UsuarioPermiso>): Promise<UsuarioPermiso>;
  update(id: number, activo: boolean): Promise<UsuarioPermiso>;
  delete(id: number): Promise<void>;
}

export const IUsuarioPermisosRepository = Symbol('IUsuarioPermisosRepository');
