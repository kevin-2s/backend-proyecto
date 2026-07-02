import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IProductosRepository } from '../../../../domain/ports/output/productos-repository.interface';
import { ProductoOrmEntity } from '../../../entities/producto.orm-entity';
import { ProductoMapper } from '../../../mappers/producto.mapper';
import { Producto } from '../../../../domain/entities/producto.domain.entity';
import { TenancyService } from '../../../../../shared/tenancy/tenancy.service';

@Injectable()
export class ProductosRepositoryAdapter implements IProductosRepository {
  constructor(
    @InjectRepository(ProductoOrmEntity)
    private readonly repository: Repository<ProductoOrmEntity>,
    private readonly tenancyService: TenancyService,
  ) {}

  async findAll(): Promise<Producto[]> {
    const tenantId = this.tenancyService.getTenantId();
    const productosOrm = await this.repository.find({
      where: tenantId === 'GLOBAL' ? {} : { tenant_id: tenantId },
      relations: ['categoria'],
    });
    return productosOrm.map(ProductoMapper.toDomain);
  }

  async findById(id: number): Promise<Producto | null> {
    const tenantId = this.tenancyService.getTenantId();
    const productoEntity = await this.repository.findOne({
      where: tenantId === 'GLOBAL' ? { id_producto: id } : { id_producto: id, tenant_id: tenantId },
      relations: ['categoria'],
    });
    if (!productoEntity) return null;
    return ProductoMapper.toDomain(productoEntity);
  }

  async create(productoData: Omit<Producto, 'id_producto' | 'categoria'>): Promise<Producto> {
    const tenantId = this.tenancyService.getTenantId();
    const ormEntity = ProductoMapper.toEntity(productoData);
    ormEntity.tenant_id = tenantId === 'GLOBAL' ? (productoData as any).tenant_id || 'default' : tenantId;
    const saved = await this.repository.save(ormEntity);
    return ProductoMapper.toDomain(saved);
  }

  async update(id: number, productoData: Partial<Omit<Producto, 'id_producto' | 'categoria'>>): Promise<Producto> {
    const tenantId = this.tenancyService.getTenantId();
    await this.repository.update(
      tenantId === 'GLOBAL' ? { id_producto: id } : { id_producto: id, tenant_id: tenantId },
      tenantId === 'GLOBAL' ? { ...productoData } as any : { ...productoData, tenant_id: tenantId } as any
    );
    return this.findById(id) as Promise<Producto>;
  }

  async delete(id: number): Promise<void> {
    const tenantId = this.tenancyService.getTenantId();
    await this.repository.delete(tenantId === 'GLOBAL' ? { id_producto: id } : { id_producto: id, tenant_id: tenantId });
  }
}
