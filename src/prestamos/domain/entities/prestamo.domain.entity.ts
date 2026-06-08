export enum EstadoPrestamo {
  ACTIVO = 'ACTIVO',
  DEVUELTO = 'DEVUELTO',
  VENCIDO = 'VENCIDO',
}

export enum EstadoDevolucionPrestamo {
  BUENO = 'BUENO',
  REGULAR = 'REGULAR',
  DANADO = 'DAÑADO',
  PERDIDO = 'PERDIDO',
}

export class PrestamoDomainEntity {
  id_prestamo?: number;
  id_item: number;
  id_usuario: number;
  id_ficha?: number;
  fecha_prestamo?: Date;
  fecha_devolucion_esperada: Date;
  fecha_devolucion_real?: Date;
  estado?: string;
  estado_devolucion?: string;
  observacion?: string;
  observacion_devolucion?: string;
}
