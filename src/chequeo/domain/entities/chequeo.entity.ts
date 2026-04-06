export class Chequeo {
  constructor(
    public readonly id: number,
    public readonly fechaChequeo: Date,
    public readonly confirmado: boolean,
    public readonly asignaId: number,
    public readonly devolucionId: number,
    public readonly usuarioId: number,
  ) {}
}
