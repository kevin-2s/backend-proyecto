export class Asigna {
  constructor(
    public readonly id: number,
    public readonly estadoFisico: string,
    public readonly estadoEntrega: string,
    public readonly fechaEnt: Date,
    public readonly fechaDevolucionEst: Date,
    public readonly observaciones: string,
    public readonly productoId: number,
    public readonly usuarioId: number,
    public readonly fichaId: number,
  ) {}
}
