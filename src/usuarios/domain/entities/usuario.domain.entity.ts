import { Rol } from '../../../roles/domain/entities/rol.domain.entity';

export class Usuario {
  constructor(
    public readonly id_usuario: number,
    public nombre: string,
    public correo: string,
    public password: string,
    public estado: boolean,
    public id_rol: number,
    public rol?: Rol,
  ) {}
}
