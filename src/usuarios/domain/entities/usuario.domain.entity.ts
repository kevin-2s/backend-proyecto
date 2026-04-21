import { Rol } from '../../../roles/domain/entities/rol.domain.entity';

export class Usuario {
  private _password?: string;

  constructor(
    public readonly id_usuario: number,
    public nombre: string,
    public correo: string,
    password_input: string | undefined, // Se recibe internamente, no se expone en JSON
    public estado: boolean,
    public id_rol: number,
    public rol?: Rol,
  ) {
    this._password = password_input;
  }

  setPassword(pwd: string): void {
    this._password = pwd;
  }

  getPassword(): string | undefined {
    return this._password;
  }
}
