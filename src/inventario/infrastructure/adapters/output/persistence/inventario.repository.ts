import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IInventarioRepository } from '../../../../domain/ports/output/inventario-repository.interface';
import { InventarioOrmEntity } from '../../../entities/inventario.orm-entity';
import { ItemOrmEntity } from '../../../../../items/infrastructure/entities/item.orm-entity';
import { EstadoItem } from '../../../../../items/domain/entities/item.domain.entity';
import { InventarioMapper } from '../../../mappers/inventario.mapper';
import { Inventario } from '../../../../domain/entities/inventario.domain.entity';
import { TenancyService } from '../../../../../shared/tenancy/tenancy.service';

@Injectable()
export class InventarioRepositoryAdapter implements IInventarioRepository {
  constructor(
    @InjectRepository(InventarioOrmEntity)
    private readonly repository: Repository<InventarioOrmEntity>,
    @InjectRepository(ItemOrmEntity)
    private readonly itemRepository: Repository<ItemOrmEntity>,
    private readonly tenancyService: TenancyService,
  ) {}

  async findAll(): Promise<Inventario[]> {
    const tenantId = this.tenancyService.getTenantId();
    const whereClause = tenantId === 'GLOBAL' ? {} : { sitio: { tenant_id: tenantId } };
    const inventarioOrm = await this.repository.find({
      where: whereClause,
      relations: ['item', 'item.producto', 'sitio'],
    });
    return inventarioOrm.map(InventarioMapper.toDomain);
  }

  async findById(id: number): Promise<Inventario | null> {
    const tenantId = this.tenancyService.getTenantId();
    const whereClause = tenantId === 'GLOBAL' ? { id_inventario: id } : { id_inventario: id, sitio: { tenant_id: tenantId } };
    const inventarioOrm = await this.repository.findOne({
      where: whereClause,
      relations: ['item', 'item.producto', 'sitio'],
    });
    if (!inventarioOrm) return null;
    return InventarioMapper.toDomain(inventarioOrm);
  }

  async findByProducto(id_producto: number): Promise<Inventario[]> {
    const tenantId = this.tenancyService.getTenantId();
    const queryBuilder = this.repository
      .createQueryBuilder('inv')
      .leftJoinAndSelect('inv.item', 'item')
      .leftJoinAndSelect('item.producto', 'producto')
      .leftJoinAndSelect('inv.sitio', 'sitio')
      .where('item.id_producto = :id_producto', { id_producto });
      
    if (tenantId !== 'GLOBAL') {
      queryBuilder.andWhere('sitio.tenant_id = :tenantId', { tenantId });
    }
    
    const rows = await queryBuilder.getMany();
    return rows.map(InventarioMapper.toDomain);
  }

  async countStockByProducto(id_producto: number): Promise<{ disponibles: number; total: number }> {
    const [total, disponibles] = await Promise.all([
      this.itemRepository.count({ where: { id_producto } }),
      this.itemRepository.count({ where: { id_producto, estado: EstadoItem.DISPONIBLE } }),
    ]);
    return { total, disponibles };
  }

  async create(inventarioData: Omit<Inventario, 'id_inventario' | 'item' | 'sitio'>): Promise<Inventario> {
    const ormEntity = InventarioMapper.toEntity(inventarioData);
    const saved = await this.repository.save(ormEntity);
    return InventarioMapper.toDomain(saved);
  }

  async update(id: number, inventarioData: Partial<Inventario>): Promise<Inventario> {
    const tenantId = this.tenancyService.getTenantId();
    const whereClause = tenantId === 'GLOBAL' ? { id_inventario: id } : { id_inventario: id, sitio: { tenant_id: tenantId } };
    
    const existing = await this.repository.findOne({ where: whereClause, relations: ['sitio'] });
    if (!existing) throw new Error('Item de inventario no encontrado o no pertenece a su sede');

    await this.repository.update(id, InventarioMapper.toEntity(inventarioData as any));
    const updated = await this.findById(id);
    return updated!;
  }

  async delete(id: number): Promise<void> {
    const tenantId = this.tenancyService.getTenantId();
    const whereClause = tenantId === 'GLOBAL' ? { id_inventario: id } : { id_inventario: id, sitio: { tenant_id: tenantId } };
    
    const existing = await this.repository.findOne({ where: whereClause, relations: ['sitio'] });
    if (!existing) throw new Error('Item de inventario no encontrado o no pertenece a su sede');

    await this.repository.delete(id);
  }
}
