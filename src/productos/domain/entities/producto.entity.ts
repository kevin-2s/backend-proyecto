export class Producto {
  constructor(
    public readonly id: number,
    public readonly nombre: string,
    public readonly descripcion: string,
    public readonly codigoUNSPSC: string,
    public readonly SKU: string,
    public readonly imagenUrl: string,
    public readonly categoriaId: number,
  ) {}
}
