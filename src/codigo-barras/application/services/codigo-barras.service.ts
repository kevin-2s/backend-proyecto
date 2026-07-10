import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { IItemsRepository, ITEMS_REPOSITORY } from '../../../items/domain/ports/output/items-repository.interface';

@Injectable()
export class CodigoBarrasService {
  constructor(
    @Inject(ITEMS_REPOSITORY)
    private readonly itemsRepository: IItemsRepository,
  ) {}

  async validateCode(code: string): Promise<any> {
    const item = await this.itemsRepository.findBySku(code);
    if (!item) {
      throw new NotFoundException(`No se encontró el ítem con código/SKU: ${code}`);
    }
    return item;
  }
}
