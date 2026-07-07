import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IAsignacionesRepository } from '../../../../domain/ports/output/asignaciones-repository.interface';
import { AsignacionOrmEntity } from '../../../entities/asignacion.orm-entity';
import { AsignacionItemOrmEntity } from '../../../entities/asignacion-item.orm-entity';
import { ItemOrmEntity } from '../../../../../items/infrastructure/entities/item.orm-entity';
import { EstadoItem } from '../../../../../items/domain/entities/item.domain.entity';
import { AsignacionMapper } from '../../../mappers/asignacion.mapper';
import { Asignacion } from '../../../../domain/entities/asignacion.domain.entity';

const RELATIONS = ['ficha', 'ficha.programa', 'producto', 'usuario_asigna', 'asignacion_items', 'asignacion_items.item'];

@Injectable()
export class AsignacionesRepositoryAdapter implements IAsignacionesRepository {
  constructor(
    @InjectRepository(AsignacionOrmEntity)
    private readonly repository: Repository<AsignacionOrmEntity>,
    @InjectRepository(ItemOrmEntity)
    private readonly itemRepository: Repository<ItemOrmEntity>,
    @InjectRepository(AsignacionItemOrmEntity)
    private readonly asignacionItemRepository: Repository<AsignacionItemOrmEntity>,
  ) {}

  async findAll(): Promise<Asignacion[]> {
    const rows = await this.repository.find({ relations: RELATIONS });
    return rows.map(AsignacionMapper.toDomain);
  }

  async findById(id: number): Promise<Asignacion | null> {
    const row = await this.repository.findOne({ where: { id_asignacion: id }, relations: RELATIONS });
    if (!row) return null;
    return AsignacionMapper.toDomain(row);
  }

  async descontarStock(id_producto: number, cantidad: number): Promise<number[]> {
    const items = await this.itemRepository
      .createQueryBuilder('item')
      .where('item.id_producto = :id_producto', { id_producto })
      .andWhere('item.estado = :estado', { estado: EstadoItem.DISPONIBLE })
      // Prioriza items con placa SENA registrada antes que los que no tienen
      .orderBy('CASE WHEN item.placa_sena IS NOT NULL THEN 0 ELSE 1 END', 'ASC')
      .addOrderBy('item.id_item', 'ASC')
      .take(cantidad)
      .getMany();
    console.log(`[Repo] encontrados ${items.length} items DISPONIBLES para producto ${id_producto}`, items.map(i => ({ id: i.id_item, estado: i.estado, placa_sena: i.placa_sena })));
    if (items.length < cantidad) {
      throw new Error(`Stock insuficiente: solo ${items.length} unidad(es) disponible(s)`);
    }
    const ids = items.map(i => i.id_item);
    await this.itemRepository
      .createQueryBuilder()
      .update()
      .set({ estado: EstadoItem.PRESTADO })
      .where('id_item IN (:...ids)', { ids })
      .execute();
    console.log(`[Repo] actualizados ids ${ids} → PRESTADO`);
    return ids;
  }

  async restaurarStock(id_producto: number, cantidad: number): Promise<void> {
    const items = await this.itemRepository.find({
      where: { id_producto, estado: EstadoItem.PRESTADO },
      take: cantidad,
      order: { id_item: 'ASC' },
    });
    if (items.length === 0) return;
    const ids = items.map(i => i.id_item);
    await this.itemRepository
      .createQueryBuilder()
      .update()
      .set({ estado: EstadoItem.DISPONIBLE })
      .where('id_item IN (:...ids)', { ids })
      .execute();
  }

  async restaurarStockPorItems(itemIds: number[]): Promise<void> {
    if (itemIds.length === 0) return;
    await this.itemRepository
      .createQueryBuilder()
      .update()
      .set({ estado: EstadoItem.DISPONIBLE })
      .where('id_item IN (:...ids)', { ids: itemIds })
      .execute();
  }

  async vincularItems(id_asignacion: number, itemIds: number[]): Promise<void> {
    if (itemIds.length === 0) return;
    const rows = itemIds.map(id_item => this.asignacionItemRepository.create({ id_asignacion, id_item }));
    await this.asignacionItemRepository.save(rows);
  }

  async obtenerItemsDeAsignacion(id_asignacion: number): Promise<number[]> {
    const rows = await this.asignacionItemRepository.find({ where: { id_asignacion } });
    return rows.map(r => r.id_item);
  }

  async obtenerItemParaAsignar(id_item: number): Promise<{ id_item: number; estado: string; id_producto: number } | null> {
    const item = await this.itemRepository.findOne({ where: { id_item } });
    if (!item) return null;
    return { id_item: item.id_item, estado: item.estado, id_producto: item.id_producto };
  }

  async marcarItemComoPrestado(id_item: number): Promise<void> {
    await this.itemRepository.update(id_item, { estado: EstadoItem.PRESTADO });
  }

  async incrementarCantidad(id_asignacion: number, incremento: number): Promise<void> {
    await this.repository.increment({ id_asignacion }, 'cantidad', incremento);
  }

  async create(data: Omit<Asignacion, 'id_asignacion' | 'ficha' | 'producto' | 'usuario_asigna'>): Promise<Asignacion> {
    const orm = AsignacionMapper.toEntity(data);
    const saved = await this.repository.save(orm);
    return this.findById(saved.id_asignacion) as Promise<Asignacion>;
  }

  async update(id: number, data: Partial<Asignacion>): Promise<Asignacion> {
    await this.repository.update(id, AsignacionMapper.toEntity(data));
    return this.findById(id) as Promise<Asignacion>;
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
