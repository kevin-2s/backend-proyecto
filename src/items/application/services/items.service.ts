import { Injectable, Inject } from '@nestjs/common';
import { IItemsUseCases } from '../../domain/ports/input/items-use-cases.interface';
import { IItemsRepository, ITEMS_REPOSITORY } from '../../domain/ports/output/items-repository.interface';
import { Item, EstadoItem } from '../../domain/entities/item.domain.entity';
import { ItemNotFoundException } from '../../domain/exceptions/item-not-found.exception';

@Injectable()
export class ItemsService implements IItemsUseCases {
  constructor(
    @Inject(ITEMS_REPOSITORY)
    private readonly itemsRepository: IItemsRepository,
  ) {}

  async obtenerItems(): Promise<Item[]> {
    return this.itemsRepository.findAll();
  }

  async obtenerItemPorId(id: number): Promise<Item> {
    const item = await this.itemsRepository.findById(id);
    if (!item) {
      throw new ItemNotFoundException(id);
    }
    return item;
  }

  async crearItem(data: { codigo_sku: string; estado: EstadoItem; id_producto: number }): Promise<Item> {
    return this.itemsRepository.create(data);
  }

  async actualizarEstadoItem(id: number, estado: EstadoItem): Promise<Item> {
    await this.obtenerItemPorId(id); // Verifica si existe
    return this.itemsRepository.update(id, { estado });
  }
}
