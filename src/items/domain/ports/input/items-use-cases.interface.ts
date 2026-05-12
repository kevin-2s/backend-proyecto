import { Item, EstadoItem } from '../../entities/item.domain.entity';

export const ITEMS_USE_CASES = Symbol('ITEMS_USE_CASES');

export interface IItemsUseCases {
  obtenerItems(): Promise<Item[]>;
  obtenerItemPorId(id: number): Promise<Item>;
  crearItem(data: { codigo_sku: string; estado: EstadoItem; id_producto: number }): Promise<Item>;
  actualizarEstadoItem(id: number, estado: EstadoItem): Promise<Item>;
}
