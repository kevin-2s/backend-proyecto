import { Item } from '../../entities/item.domain.entity';

export const ITEMS_REPOSITORY = Symbol('ITEMS_REPOSITORY');

export interface IItemsRepository {
  findAll(): Promise<Item[]>;
  findById(id: number): Promise<Item | null>;
  create(item: Omit<Item, 'id_item' | 'producto'>): Promise<Item>;
  update(id: number, item: Partial<Omit<Item, 'id_item' | 'producto'>>): Promise<Item>;
}
