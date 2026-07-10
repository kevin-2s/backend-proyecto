import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, In, Repository } from 'typeorm';
import { IItemsRepository } from '../../../../domain/ports/output/items-repository.interface';
import { ItemOrmEntity } from '../../../entities/item.orm-entity';
import { ItemMapper } from '../../../mappers/item.mapper';
import { Item } from '../../../../domain/entities/item.domain.entity';
import { AsignacionItemOrmEntity } from '../../../../../asignaciones/infrastructure/entities/asignacion-item.orm-entity';
import { NovedadOrmEntity } from '../../../../../novedades/infrastructure/entities/novedad.orm-entity';

@Injectable()
export class ItemsRepositoryAdapter implements IItemsRepository {
  constructor(
    @InjectRepository(ItemOrmEntity)
    private readonly repository: Repository<ItemOrmEntity>,
    @InjectRepository(AsignacionItemOrmEntity)
    private readonly asignacionItemRepository: Repository<AsignacionItemOrmEntity>,
    @InjectRepository(NovedadOrmEntity)
    private readonly novedadRepository: Repository<NovedadOrmEntity>,
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

  async findByProducto(id_producto: number): Promise<Item[]> {
    const items = await this.repository.find({ where: { id_producto }, relations: ['producto'] });
    return items.map(ItemMapper.toDomain);
  }

  async countByProducto(id_producto: number): Promise<number> {
    return this.repository.count({ where: { id_producto } });
  }

  async findDetalleByPlaca(placa: string, requestingUserId?: number, requestingRole?: string): Promise<{
    item: Item;
    prestamo_activo: any | null;
    asignacion_activa: any | null;
    novedad_activa: any | null;
  } | null> {
    const itemOrm = await this.repository.findOne({
      where: { placa_sena: ILike(placa) },
      relations: ['producto', 'producto.categoria', 'sitio', 'sitio.responsable'],
    });
    if (!itemOrm) return null;

    const asignacionItemOrm = await this.asignacionItemRepository.findOne({
      where: { id_item: itemOrm.id_item, asignacion: { estado: 'ACTIVA' } },
      relations: ['asignacion', 'asignacion.ficha', 'asignacion.ficha.programa', 'asignacion.usuario_asigna'],
      order: { id_asignacion_item: 'DESC' },
    });
    const asignacionActiva = asignacionItemOrm?.asignacion ?? null;

    // Restrict visibility: non-admin users only see items in their own sitio,
    // or (instructors) items assigned to a ficha where they are id_responsable
    if (requestingUserId !== undefined && requestingRole !== undefined) {
      const role = requestingRole.toLowerCase();
      const esAdmin = role === 'administrador' || role === 'super administrador';
      if (!esAdmin) {
        let tieneAcceso = false;
        if (itemOrm.sitio?.id_responsable === requestingUserId) {
          tieneAcceso = true;
        }
        if (!tieneAcceso && role === 'instructor') {
          const fichaResponsable = asignacionItemOrm?.asignacion?.ficha?.id_responsable;
          if (fichaResponsable === requestingUserId) tieneAcceso = true;
        }
        if (!tieneAcceso) return null;
      }
    }

    const novedadActiva = await this.novedadRepository.findOne({
      where: { id_item: itemOrm.id_item, estado: In(['PENDIENTE', 'EN_PROCESO']) },
      order: { fecha: 'DESC' },
    });

    return {
      item: ItemMapper.toDomain(itemOrm),
      prestamo_activo: null,
      asignacion_activa: asignacionActiva,
      novedad_activa: novedadActiva ?? null,
    };
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
