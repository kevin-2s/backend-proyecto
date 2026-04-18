import { ItemChequeo, EstadoEncontrado } from '../../entities/item-chequeo.domain.entity';

export const ITEMS_CHEQUEO_USE_CASES = Symbol('ITEMS_CHEQUEO_USE_CASES');

export interface IItemsChequeoUseCases {
  obtenerItemsChequeo(): Promise<ItemChequeo[]>;
  crearItemChequeo(data: { estado_encontrado: EstadoEncontrado; id_chequeo: number; id_item: number }): Promise<ItemChequeo>;
}
