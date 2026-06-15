import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IAsignacionesRepository } from '../../../../domain/ports/output/asignaciones-repository.interface';
import { AsignacionOrmEntity } from '../../../entities/asignacion.orm-entity';
import { ItemOrmEntity } from '../../../../../items/infrastructure/entities/item.orm-entity';
import { EstadoItem } from '../../../../../items/domain/entities/item.domain.entity';
import { AsignacionMapper } from '../../../mappers/asignacion.mapper';
import { Asignacion } from '../../../../domain/entities/asignacion.domain.entity';

const RELATIONS = ['ficha', 'ficha.programa', 'producto', 'usuario_asigna'];

@Injectable()
export class AsignacionesRepositoryAdapter implements IAsignacionesRepository {
  constructor(
    @InjectRepository(AsignacionOrmEntity)
    private readonly repository: Repository<AsignacionOrmEntity>,
    @InjectRepository(ItemOrmEntity)
    private readonly itemRepository: Repository<ItemOrmEntity>,
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

  async descontarStock(id_producto: number, cantidad: number): Promise<void> {
    const items = await this.itemRepository.find({
      where: { id_producto, estado: EstadoItem.DISPONIBLE },
      take: cantidad,
      order: { id_item: 'ASC' },
    });
    console.log(`[Repo] encontrados ${items.length} items DISPONIBLES para producto ${id_producto}`, items.map(i => ({ id: i.id_item, estado: i.estado })));
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
