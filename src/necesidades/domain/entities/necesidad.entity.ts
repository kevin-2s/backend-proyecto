export class Necesidad {
  constructor(
    public readonly id: number,
    public readonly cantidadN: number,
    public readonly fechaLimite: Date,
    public readonly usuarioId: number,
    public readonly productoId: number,
    public readonly fichaId: number,
  ) {}
}
