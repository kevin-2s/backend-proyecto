import { AsignarPermisoDto } from '../../../infrastructure/adapters/input/http/dtos/asignar-permiso.dto';
import { ActualizarPermisoUsuarioDto } from '../../../infrastructure/adapters/input/http/dtos/actualizar-permiso-usuario.dto';

export interface IUsuarioPermisosUseCases {
  getPermisosByUsuario(id_usuario: number): Promise<Record<string, any[]>>;
  asignarPermiso(id_usuario: number, dto: AsignarPermisoDto): Promise<any>;
  actualizarPermiso(id_usuario: number, id_permiso: number, dto: ActualizarPermisoUsuarioDto): Promise<any>;
  eliminarPermiso(id_usuario: number, id_permiso: number): Promise<void>;
}

export const IUsuarioPermisosUseCases = Symbol('IUsuarioPermisosUseCases');
