import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IFichasRepository } from '../../../../domain/ports/output/fichas-repository.interface';
import { FichaOrmEntity } from '../../../entities/ficha.orm-entity';
import { FichaMapper } from '../../../mappers/ficha.mapper';
import { Ficha } from '../../../../domain/entities/ficha.domain.entity';
import { TenancyService } from '../../../../../shared/tenancy/tenancy.service';

@Injectable()
export class FichasRepositoryAdapter implements IFichasRepository {
  constructor(
    @InjectRepository(FichaOrmEntity)
    private readonly repository: Repository<FichaOrmEntity>,
    private readonly tenancyService: TenancyService,
  ) {}

  async findAll(): Promise<Ficha[]> {
    const tenantId = this.tenancyService.getTenantId();
    const whereClause = tenantId === 'GLOBAL' ? {} : { programa: { area: { id_sede: Number(tenantId) } } };
    const fichasOrm = await this.repository.find({
      where: whereClause,
      relations: ['responsable', 'programa', 'programa.area', 'programa.area.sede'],
    });
    return fichasOrm.map(FichaMapper.toDomain);
  }

  async findById(id: number): Promise<Ficha | null> {
    const tenantId = this.tenancyService.getTenantId();
    const whereClause = tenantId === 'GLOBAL' ? { id_ficha: id } : { id_ficha: id, programa: { area: { id_sede: Number(tenantId) } } };
    const fichaOrm = await this.repository.findOne({
      where: whereClause,
      relations: ['responsable', 'programa', 'programa.area', 'programa.area.sede'],
    });
    if (!fichaOrm) return null;
    return FichaMapper.toDomain(fichaOrm);
  }

  async create(fichaData: Omit<Ficha, 'id_ficha' | 'responsable'>): Promise<Ficha> {
    const ormEntity = FichaMapper.toEntity(fichaData);
    const saved = await this.repository.save(ormEntity);
    const savedWithRelations = await this.repository.findOne({
      where: { id_ficha: saved.id_ficha },
      relations: ['responsable', 'programa', 'programa.area', 'programa.area.sede'],
    });
    return FichaMapper.toDomain(savedWithRelations ?? saved);
  }

  async update(id: number, data: Partial<Ficha>): Promise<Ficha> {
    const tenantId = this.tenancyService.getTenantId();
    const whereClause = tenantId === 'GLOBAL' ? { id_ficha: id } : { id_ficha: id, programa: { area: { id_sede: Number(tenantId) } } };

    const existing = await this.repository.findOne({ where: whereClause });
    if (!existing) throw new Error('Ficha no encontrada o no pertenece a su sede');

    const ormEntity = FichaMapper.toEntity(data);
    await this.repository.update(id, ormEntity);
    const updated = await this.findById(id);
    if (!updated) throw new Error('Ficha no encontrada después de actualizar');
    return updated;
  }

  async delete(id: number): Promise<void> {
    const tenantId = this.tenancyService.getTenantId();
    const whereClause = tenantId === 'GLOBAL' ? { id_ficha: id } : { id_ficha: id, programa: { area: { id_sede: Number(tenantId) } } };

    const existing = await this.repository.findOne({ where: whereClause });
    if (!existing) throw new Error('Ficha no encontrada o no pertenece a su sede');

    await this.repository.delete(id);
  }
}
