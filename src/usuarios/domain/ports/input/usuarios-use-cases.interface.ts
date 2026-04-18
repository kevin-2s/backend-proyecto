import { Usuario } from '../../entities/usuario.domain.entity';

export const USUARIOS_USE_CASES = Symbol('USUARIOS_USE_CASES');

export interface IUsuariosUseCases {
  obtenerUsuarios(): Promise<Usuario[]>;
  obtenerUsuarioPorId(id: number): Promise<Usuario>;
  crearUsuario(data: { nombre: string; correo: string; password: string; id_rol: number }): Promise<Usuario>;
  actualizarUsuario(id: number, data: Partial<{ nombre: string; correo: string; password: string; estado: boolean; id_rol: number }>): Promise<Usuario>;
}
