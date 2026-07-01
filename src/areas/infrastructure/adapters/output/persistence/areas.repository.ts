import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IAreasRepository } from '../../../../domain/ports/output/areas-repository.interface';
import { AreaOrmEntity } from '../../../entities/area.orm-entity';
import { AreaMapper } from '../../../mappers/area.mapper';
import { Area } from '../../../../domain/entities/area.domain.entity';
import { TenancyService } from '../../../../../shared/tenancy/tenancy.service';

@Injectable()
export class AreasRepositoryAdapter implements IAreasRepository {
  constructor(
    @InjectRepository(AreaOrmEntity)
    private readonly repository: Repository<AreaOrmEntity>,
    private readonly tenancyService: TenancyService,
  ) {}

  async findAll(): Promise<Area[]> {
    const tenantId = this.tenancyService.getTenantId();
    const whereClause = tenantId === 'GLOBAL' ? {} : { id_sede: Number(tenantId) };
    const areasOrm = await this.repository.find({ 
      where: whereClause,
      relations: ['sede', 'sede.centro'] 
    });
    return areasOrm.map(AreaMapper.toDomain);
  }

  async findById(id: number): Promise<Area | null> {
    const tenantId = this.tenancyService.getTenantId();
    const whereClause = tenantId === 'GLOBAL' ? { id_area: id } : { id_area: id, id_sede: Number(tenantId) };
    const areaOrm = await this.repository.findOne({ 
      where: whereClause, 
      relations: ['sede', 'sede.centro'] 
    });
    if (!areaOrm) return null;
    return AreaMapper.toDomain(areaOrm);
  }

  async create(areaData: Partial<Omit<Area, 'id_area'>>): Promise<Area> {
    const ormEntity = AreaMapper.toEntity(areaData);
    const saved = await this.repository.save(ormEntity);
    return AreaMapper.toDomain(saved);
  }

  async update(id: number, areaData: Partial<Area>): Promise<Area> {
    const tenantId = this.tenancyService.getTenantId();
    const whereClause = tenantId === 'GLOBAL' ? { id_area: id } : { id_area: id, id_sede: Number(tenantId) };
    await this.repository.update(whereClause, AreaMapper.toEntity(areaData));
    const updated = await this.findById(id);
    return updated!;
  }

  async delete(id: number): Promise<void> {
    const tenantId = this.tenancyService.getTenantId();
    const whereClause = tenantId === 'GLOBAL' ? { id_area: id } : { id_area: id, id_sede: Number(tenantId) };
    await this.repository.delete(whereClause);
  }
}
