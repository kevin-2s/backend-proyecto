export class OrdenCompraDomainEntity {
  id_orden?: number;
  id_proveedor: number;
  id_item: number;
  cantidad: number;
  precio_unitario: number;
  precio_total: number;
  fecha_orden?: Date;
  estado?: string; // 'PENDIENTE', 'RECIBIDA', 'CANCELADA'
  observacion?: string;
}
