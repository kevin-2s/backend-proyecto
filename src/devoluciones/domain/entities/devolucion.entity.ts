export class Devolucion {
  constructor(
    public readonly id: number,
    public readonly estadoFisico: string,
    public readonly fechaReal: Date,
    public readonly observaciones: string,
    public readonly asignaId: number,
    public readonly productoId: number,
    public readonly movimientoId: number,
  ) {}
}
