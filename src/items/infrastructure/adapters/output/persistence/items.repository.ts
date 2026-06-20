import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IItemsRepository } from '../../../../domain/ports/output/items-repository.interface';
import { ItemOrmEntity } from '../../../entities/item.orm-entity';
import { ItemMapper } from '../../../mappers/item.mapper';
import { Item } from '../../../../domain/entities/item.domain.entity';
import { PrestamoOrmEntity } from '../../../../../prestamos/infrastructure/entities/prestamo.orm-entity';
import { EstadoPrestamo } from '../../../../../prestamos/domain/entities/prestamo.domain.entity';

@Injectable()
export class ItemsRepositoryAdapter implements IItemsRepository {
  constructor(
    @InjectRepository(ItemOrmEntity)
    private readonly repository: Repository<ItemOrmEntity>,
    @InjectRepository(PrestamoOrmEntity)
    private readonly prestamoRepository: Repository<PrestamoOrmEntity>,
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

  async findBySku(sku: string): Promise<Item | null> {
    const itemOrm = await this.repository.findOne({ where: { codigo_sku: sku }, relations: ['producto'] });
    if (!itemOrm) return null;
    return ItemMapper.toDomain(itemOrm);
  }

  async countByProducto(id_producto: number): Promise<number> {
    return this.repository.count({ where: { id_producto } });
  }

  async findDetalleByPlaca(placa: string): Promise<{ item: Item; prestamo_activo: any | null } | null> {
    const itemOrm = await this.repository.findOne({ where: { placa_sena: placa }, relations: ['producto', 'producto.categoria'] });
    if (!itemOrm) return null;

    const prestamoOrm = await this.prestamoRepository.findOne({
      where: { id_item: itemOrm.id_item, estado: EstadoPrestamo.ACTIVO },
      relations: ['usuario_solicitante', 'usuario_responsable'],
      order: { fecha_prestamo: 'DESC' },
    });

    return { item: ItemMapper.toDomain(itemOrm), prestamo_activo: prestamoOrm ?? null };
  }

  async create(itemData: Omit<Item, 'id_item' | 'producto'>): Promise<Item> {
    const ormEntity = ItemMapper.toEntity(itemData);
    const saved = await this.repository.save(ormEntity);
    return ItemMapper.toDomain(saved);
  }

  async update(id: number, itemData: Partial<Omit<Item, 'id_item' | 'producto'>>): Promise<Item> {
    await this.repository.update(id, itemData);
    return this.findById(id) as Promise<Item>;
  }
}
