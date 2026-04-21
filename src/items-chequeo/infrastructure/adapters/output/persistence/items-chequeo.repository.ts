import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IItemsChequeoRepository } from '../../../../domain/ports/output/items-chequeo-repository.interface';
import { ItemChequeoOrmEntity } from '../../../entities/item-chequeo.orm-entity';
import { ItemChequeoMapper } from '../../../mappers/item-chequeo.mapper';
import { ItemChequeo } from '../../../../domain/entities/item-chequeo.domain.entity';

@Injectable()
export class ItemsChequeoRepositoryAdapter implements IItemsChequeoRepository {
  constructor(
    @InjectRepository(ItemChequeoOrmEntity)
    private readonly repository: Repository<ItemChequeoOrmEntity>,
  ) {}

  async findAll(): Promise<ItemChequeo[]> {
    const ormList = await this.repository.find({ relations: ['chequeo', 'item'] });
    return ormList.map(ItemChequeoMapper.toDomain);
  }

  async create(itemData: Omit<ItemChequeo, 'id_item_chequeo' | 'chequeo' | 'item'>): Promise<ItemChequeo> {
    const ormEntity = ItemChequeoMapper.toEntity(itemData);
    const saved = await this.repository.save(ormEntity);
    return ItemChequeoMapper.toDomain(saved);
  }
}
