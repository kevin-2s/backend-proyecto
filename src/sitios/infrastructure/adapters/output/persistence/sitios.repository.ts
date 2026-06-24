import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ISitiosRepository } from '../../../../domain/ports/output/sitios-repository.interface';
import { SitioOrmEntity } from '../../../entities/sitio.orm-entity';
import { SitioMapper } from '../../../mappers/sitio.mapper';
import { Sitio } from '../../../../domain/entities/sitio.domain.entity';
import { TenancyService } from '../../../../../shared/tenancy/tenancy.service';

@Injectable()
export class SitiosRepositoryAdapter implements ISitiosRepository {
  constructor(
    @InjectRepository(SitioOrmEntity)
    private readonly repository: Repository<SitioOrmEntity>,
    private readonly tenancyService: TenancyService,
  ) {}

  async findAll(): Promise<Sitio[]> {
    const tenantId = this.tenancyService.getTenantId();
    const sitiosOrm = await this.repository.find({
      where: { tenant_id: tenantId },
      relations: ['responsable', 'centro'],
    });
    return sitiosOrm.map(SitioMapper.toDomain);
  }

  async findById(id: number): Promise<Sitio | null> {
    const tenantId = this.tenancyService.getTenantId();
    const sitioOrm = await this.repository.findOne({
      where: { id_sitio: id, tenant_id: tenantId },
      relations: ['responsable', 'centro'],
    });
    if (!sitioOrm) return null;
    return SitioMapper.toDomain(sitioOrm);
  }

  async create(sitioData: Partial<Omit<Sitio, 'id_sitio' | 'responsable'>>): Promise<Sitio> {
    const tenantId = this.tenancyService.getTenantId();
    const ormEntity = SitioMapper.toEntity(sitioData);
    ormEntity.tenant_id = tenantId;
    const saved = await this.repository.save(ormEntity);
    return SitioMapper.toDomain(saved);
  }

  async update(id: number, sitioData: Partial<Sitio>): Promise<Sitio> {
    const tenantId = this.tenancyService.getTenantId();
    await this.repository.update(
      { id_sitio: id, tenant_id: tenantId },
      { ...SitioMapper.toEntity(sitioData as any), tenant_id: tenantId } as any
    );
    const updated = await this.findById(id);
    return updated!;
  }

  async delete(id: number): Promise<void> {
    const tenantId = this.tenancyService.getTenantId();
    await this.repository.delete({ id_sitio: id, tenant_id: tenantId });
  }
}
