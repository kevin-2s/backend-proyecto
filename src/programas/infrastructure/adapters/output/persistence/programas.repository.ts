import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IProgramasRepository } from '../../../../domain/ports/output/programas-repository.interface';
import { ProgramaOrmEntity } from '../../../entities/programa.orm-entity';
import { ProgramaMapper } from '../../../mappers/programa.mapper';
import { Programa } from '../../../../domain/entities/programa.domain.entity';
import { TenancyService } from '../../../../../shared/tenancy/tenancy.service';

@Injectable()
export class ProgramasRepositoryAdapter implements IProgramasRepository {
  constructor(
    @InjectRepository(ProgramaOrmEntity)
    private readonly repository: Repository<ProgramaOrmEntity>,
    private readonly tenancyService: TenancyService,
  ) {}

  async findAll(): Promise<Programa[]> {
    const tenantId = this.tenancyService.getTenantId();
    const whereClause = tenantId === 'GLOBAL' ? {} : { area: { id_sede: Number(tenantId) } };
    const ormEntities = await this.repository.find({
      where: whereClause,
      relations: ['area', 'area.sede'],
    });
    return ormEntities.map(ProgramaMapper.toDomain);
  }

  async findById(id: number): Promise<Programa | null> {
    const tenantId = this.tenancyService.getTenantId();
    const whereClause = tenantId === 'GLOBAL' ? { id_programa: id } : { id_programa: id, area: { id_sede: Number(tenantId) } };
    const ormEntity = await this.repository.findOne({
      where: whereClause,
      relations: ['area', 'area.sede'],
    });
    if (!ormEntity) return null;
    return ProgramaMapper.toDomain(ormEntity);
  }

  async create(programaData: Partial<Omit<Programa, 'id_programa'>>): Promise<Programa> {
    const ormEntity = ProgramaMapper.toEntity(programaData);
    const saved = await this.repository.save(ormEntity);
    return this.findById(saved.id_programa) as any;
  }

  async update(id: number, programaData: Partial<Programa>): Promise<Programa> {
    const tenantId = this.tenancyService.getTenantId();
    const whereClause = tenantId === 'GLOBAL' ? { id_programa: id } : { id_programa: id, area: { id_sede: Number(tenantId) } };
    
    // First find if the record exists and belongs to the user's Sede
    const existing = await this.repository.findOne({ where: whereClause });
    if (!existing) throw new Error('Programa no encontrado o no pertenece a su sede');

    await this.repository.update(id, ProgramaMapper.toEntity(programaData));
    const updated = await this.findById(id);
    return updated!;
  }

  async delete(id: number): Promise<void> {
    const tenantId = this.tenancyService.getTenantId();
    const whereClause = tenantId === 'GLOBAL' ? { id_programa: id } : { id_programa: id, area: { id_sede: Number(tenantId) } };
    
    const existing = await this.repository.findOne({ where: whereClause });
    if (!existing) throw new Error('Programa no encontrado o no pertenece a su sede');

    await this.repository.delete(id);
  }
}
