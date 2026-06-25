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
    public codigo_sku: string | null,
    public estado: string,
    public id_producto: number,
    public placa_sena: string | null = null,
    public id_sitio: number | null = null,
    public producto?: Producto,
  ) {}
}
