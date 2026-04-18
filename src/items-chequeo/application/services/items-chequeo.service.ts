import { Injectable, Inject } from '@nestjs/common';
import { IItemsChequeoUseCases } from '../../domain/ports/input/items-chequeo-use-cases.interface';
import { IItemsChequeoRepository, ITEMS_CHEQUEO_REPOSITORY } from '../../domain/ports/output/items-chequeo-repository.interface';
import { ItemChequeo, EstadoEncontrado } from '../../domain/entities/item-chequeo.domain.entity';

@Injectable()
export class ItemsChequeoService implements IItemsChequeoUseCases {
  constructor(
    @Inject(ITEMS_CHEQUEO_REPOSITORY)
    private readonly itemsChequeoRepository: IItemsChequeoRepository,
  ) {}

  async obtenerItemsChequeo(): Promise<ItemChequeo[]> {
    return this.itemsChequeoRepository.findAll();
  }

  async crearItemChequeo(data: { estado_encontrado: EstadoEncontrado; id_chequeo: number; id_item: number }): Promise<ItemChequeo> {
    return this.itemsChequeoRepository.create(data);
  }
}
