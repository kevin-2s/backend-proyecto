import { Producto } from '../../../productos/domain/entities/producto.domain.entity';

export enum EstadoItem {
  DISPONIBLE = 'DISPONIBLE',
  PRESTADO = 'PRESTADO',
  DANADO = 'DAÑADO',
  PERDIDO = 'PERDIDO',
}

export class Item {
  constructor(
    public readonly id_item: number,
    public codigo_sku: string,
    public estado: EstadoItem,
    public id_producto: number,
    public producto?: Producto,
  ) {}
}
