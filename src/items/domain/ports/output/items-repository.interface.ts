import { Item } from '../../entities/item.domain.entity';

export const ITEMS_REPOSITORY = Symbol('ITEMS_REPOSITORY');

export interface IItemsRepository {
  findAll(): Promise<Item[]>;
  findById(id: number): Promise<Item | null>;
  findBySku(sku: string): Promise<Item | null>;
  countByProducto(id_producto: number): Promise<number>;
  create(item: Omit<Item, 'id_item' | 'producto'>): Promise<Item>;
  update(id: number, item: Partial<Omit<Item, 'id_item' | 'producto'>>): Promise<Item>;
  findDetalleByPlaca(placa: string): Promise<{
    item: Item;
    prestamo_activo: any | null;
    asignacion_activa: any | null;
    novedad_activa: any | null;
  } | null>;
}
