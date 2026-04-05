export class Inventario {
  constructor(
    public readonly id: number,
    public readonly cantidadActual: number,
    public readonly stockMinimo: number,
    public readonly productoId: number,
    public readonly sitioId: number,
  ) {}
}
