import { Permiso } from '../../permisos/domain/permiso';
import { Usuario } from '../../usuarios/domain/entities/usuario.domain.entity';

export class UsuarioPermiso {
  constructor(
    public id: number,
    public id_usuario: number,
    public id_permiso: number,
    public activo: boolean,
    public fecha_asignacion: Date,
    public permiso?: Permiso,
    public usuario?: Usuario,
  ) {}
}
