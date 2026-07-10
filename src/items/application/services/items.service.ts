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

  async crearItem(data: { codigo_sku?: string | null; estado: EstadoItem; id_producto: number; placa_sena?: string | null }): Promise<Item> {
    return this.itemsRepository.create({ ...data, codigo_sku: data.codigo_sku ?? null, placa_sena: data.placa_sena ?? null, id_sitio: null });
  }

  async actualizarEstadoItem(id: number, estado: EstadoItem): Promise<Item> {
    await this.obtenerItemPorId(id); // Verifica si existe
    return this.itemsRepository.update(id, { estado });
  }

  async actualizarItem(id: number, data: { placa_sena?: string | null; id_sitio?: number | null }): Promise<Item> {
    await this.obtenerItemPorId(id); // Verifica si existe
    return this.itemsRepository.update(id, data);
  }

  async buscarPorPlaca(placa: string, requestingUserId?: number, requestingRole?: string): Promise<{
    item: Item;
    prestamo_activo: any | null;
    asignacion_activa: any | null;
    novedad_activa: any | null;
  } | null> {
    return this.itemsRepository.findDetalleByPlaca(placa, requestingUserId, requestingRole);
  }
}
