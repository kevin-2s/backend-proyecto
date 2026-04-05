export class Movimiento {
  constructor(
    public readonly id: number,
    public readonly tipo: string,
    public readonly cantidad: number,
    public readonly fecha: Date,
    public readonly observaciones: string,
    public readonly productoId: number,
    public readonly usuarioId: number,
    public readonly sitioId: number,
  ) {}
}
