import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ISedesRepository } from '../../../../domain/ports/output/sedes-repository.interface';
import { SedeOrmEntity } from '../../../entities/sede.orm-entity';
import { SedeMapper } from '../../../mappers/sede.mapper';
import { Sede } from '../../../../domain/entities/sede.domain.entity';
import { TenancyService } from '../../../../../shared/tenancy/tenancy.service';

@Injectable()
export class SedesRepositoryAdapter implements ISedesRepository {
  constructor(
    @InjectRepository(SedeOrmEntity)
    private readonly repository: Repository<SedeOrmEntity>,
    private readonly tenancyService: TenancyService,
  ) {}

  async findAll(): Promise<Sede[]> {
    const tenantId = this.tenancyService.getTenantId();
    const whereClause = tenantId === 'GLOBAL' ? {} : { id_sede: Number(tenantId) };
    const sedesOrm = await this.repository.find({
      where: whereClause,
      relations: ['centro', 'administrador'],
    });
    return sedesOrm.map(SedeMapper.toDomain);
  }

  async findById(id: number): Promise<Sede | null> {
    const tenantId = this.tenancyService.getTenantId();
    if (tenantId !== 'GLOBAL' && Number(tenantId) !== id) {
      return null;
    }
    const sedeOrm = await this.repository.findOne({
      where: { id_sede: id },
      relations: ['centro', 'administrador'],
    });
    if (!sedeOrm) return null;
    return SedeMapper.toDomain(sedeOrm);
  }

  async create(sedeData: Partial<Omit<Sede, 'id_sede' | 'centro'>>): Promise<Sede> {
    const ormEntity = SedeMapper.toEntity(sedeData);
    const saved = await this.repository.save(ormEntity);
    return this.findById(saved.id_sede) as any;
  }

  async update(id: number, SedeData: Partial<Sede>): Promise<Sede> {
    const tenantId = this.tenancyService.getTenantId();
    if (tenantId !== 'GLOBAL' && Number(tenantId) !== id) {
      throw new Error('Sede no encontrada o no pertenece a su sede');
    }
    await this.repository.update({ id_sede: id }, SedeMapper.toEntity(SedeData));
    const updated = await this.findById(id);
    return updated!;
  }

  async delete(id: number): Promise<void> {
    const tenantId = this.tenancyService.getTenantId();
    if (tenantId !== 'GLOBAL' && Number(tenantId) !== id) {
      throw new Error('Sede no encontrada o no pertenece a su sede');
    }
    await this.repository.delete({ id_sede: id });
  }
}
