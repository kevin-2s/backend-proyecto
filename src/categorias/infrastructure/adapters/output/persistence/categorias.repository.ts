import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ICategoriasRepository } from '../../../../domain/ports/output/categorias-repository.interface';
import { CategoriaOrmEntity } from '../../../entities/categoria.orm-entity';
import { CategoriaMapper } from '../../../mappers/categoria.mapper';
import { Categoria } from '../../../../domain/entities/categoria.domain.entity';
import { TenancyService } from '../../../../../shared/tenancy/tenancy.service';

@Injectable()
export class CategoriasRepositoryAdapter implements ICategoriasRepository {
  constructor(
    @InjectRepository(CategoriaOrmEntity)
    private readonly repository: Repository<CategoriaOrmEntity>,
    private readonly tenancyService: TenancyService,
  ) {}

  async findAll(): Promise<Categoria[]> {
    const tenantId = this.tenancyService.getTenantId();
    const categoriasOrm = await this.repository.find({ where: tenantId === 'GLOBAL' ? {} : { tenant_id: tenantId } });
    return categoriasOrm.map(CategoriaMapper.toDomain);
  }

  async findById(id: number): Promise<Categoria | null> {
    const tenantId = this.tenancyService.getTenantId();
    const categoriaOrm = await this.repository.findOne({ where: tenantId === 'GLOBAL' ? { id_categoria: id } : { id_categoria: id, tenant_id: tenantId } });
    if (!categoriaOrm) return null;
    return CategoriaMapper.toDomain(categoriaOrm);
  }

  async create(categoriaData: Omit<Categoria, 'id_categoria'>): Promise<Categoria> {
    const tenantId = this.tenancyService.getTenantId();
    const ormEntity = CategoriaMapper.toEntity(categoriaData);
    ormEntity.tenant_id = tenantId === 'GLOBAL' ? (categoriaData as any).tenant_id || 'default' : tenantId;
    const saved = await this.repository.save(ormEntity);
    return CategoriaMapper.toDomain(saved);
  }

  async update(id: number, categoriaData: Partial<Categoria>): Promise<Categoria> {
    const tenantId = this.tenancyService.getTenantId();
    await this.repository.update(
      tenantId === 'GLOBAL' ? { id_categoria: id } : { id_categoria: id, tenant_id: tenantId },
      { ...CategoriaMapper.toEntity(categoriaData as any), tenant_id: tenantId } as any
    );
    const updated = await this.findById(id);
    return updated!;
  }

  async delete(id: number): Promise<void> {
    const tenantId = this.tenancyService.getTenantId();
    await this.repository.delete(tenantId === 'GLOBAL' ? { id_categoria: id } : { id_categoria: id, tenant_id: tenantId });
  }
}
