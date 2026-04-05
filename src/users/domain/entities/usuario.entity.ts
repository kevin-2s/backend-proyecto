export class Usuario {
  constructor(
    public readonly id: number,
    public readonly nombreCompleto: string,
    public readonly correo: string,
    public readonly contrasena: string,
    public readonly estado: boolean,
    public readonly rolId: number,
  ) {}
}
