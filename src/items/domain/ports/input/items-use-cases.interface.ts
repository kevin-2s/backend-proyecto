import { Item, EstadoItem } from '../../entities/item.domain.entity';

export const ITEMS_USE_CASES = Symbol('ITEMS_USE_CASES');

export interface IItemsUseCases {
  obtenerItems(): Promise<Item[]>;
  obtenerItemPorId(id: number): Promise<Item>;
  crearItem(data: { codigo_sku?: string | null; estado: EstadoItem; id_producto: number; placa_sena?: string | null }): Promise<Item>;
  actualizarEstadoItem(id: number, estado: EstadoItem): Promise<Item>;
  actualizarItem(id: number, data: { placa_sena?: string | null }): Promise<Item>;
  buscarPorPlaca(placa: string): Promise<{
    item: Item;
    prestamo_activo: any | null;
    asignacion_activa: any | null;
    novedad_activa: any | null;
  } | null>;
}
