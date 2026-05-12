import { ItemChequeo } from '../../entities/item-chequeo.domain.entity';

export const ITEMS_CHEQUEO_REPOSITORY = Symbol('ITEMS_CHEQUEO_REPOSITORY');

export interface IItemsChequeoRepository {
  findAll(): Promise<ItemChequeo[]>;
  create(itemChequeo: Omit<ItemChequeo, 'id_item_chequeo' | 'chequeo' | 'item'>): Promise<ItemChequeo>;
}
