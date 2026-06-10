export enum EstadoPrestamo {
  ACTIVO = 'ACTIVO',
  DEVUELTO = 'DEVUELTO',
  VENCIDO = 'VENCIDO',
}

export class Prestamo {
  constructor(
    public readonly id_prestamo: number,
    public fecha_prestamo: Date,
    public fecha_devolucion_esperada: Date,
    public fecha_devolucion_real: Date | null,
    public estado: EstadoPrestamo,
    public observacion: string | null,
    public id_item: number,
    public id_usuario_solicitante: number,
    public id_usuario_responsable: number,
  ) {}
}
