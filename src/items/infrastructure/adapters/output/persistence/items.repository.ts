import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IItemsRepository } from '../../../../domain/ports/output/items-repository.interface';
import { ItemOrmEntity } from '../../../entities/item.orm-entity';
import { ItemMapper } from '../../../mappers/item.mapper';
import { Item } from '../../../../domain/entities/item.domain.entity';

@Injectable()
export class ItemsRepositoryAdapter implements IItemsRepository {
  constructor(
    @InjectRepository(ItemOrmEntity)
    private readonly repository: Repository<ItemOrmEntity>,
  ) {}

  async findAll(): Promise<Item[]> {
    const itemsOrm = await this.repository.find({ relations: ['producto'] });
    return itemsOrm.map(ItemMapper.toDomain);
  }

  async findById(id: number): Promise<Item | null> {
    const itemOrm = await this.repository.findOne({ where: { id_item: id }, relations: ['producto'] });
    if (!itemOrm) return null;
    return ItemMapper.toDomain(itemOrm);
  }

  async create(itemData: Omit<Item, 'id_item' | 'producto'>): Promise<Item> {
    const ormEntity = ItemMapper.toOrm(itemData);
    const saved = await this.repository.save(ormEntity);
    return ItemMapper.toDomain(saved);
  }

  async update(id: number, itemData: Partial<Omit<Item, 'id_item' | 'producto'>>): Promise<Item> {
    await this.repository.update(id, itemData);
    return this.findById(id) as Promise<Item>;
  }
}
