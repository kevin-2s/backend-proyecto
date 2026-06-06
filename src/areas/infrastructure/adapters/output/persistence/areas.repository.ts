import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IAreasRepository } from '../../../../domain/ports/output/areas-repository.interface';
import { AreaOrmEntity } from '../../../entities/area.orm-entity';
import { AreaMapper } from '../../../mappers/area.mapper';
import { Area } from '../../../../domain/entities/area.domain.entity';

@Injectable()
export class AreasRepositoryAdapter implements IAreasRepository {
  constructor(
    @InjectRepository(AreaOrmEntity)
    private readonly repository: Repository<AreaOrmEntity>,
  ) {}

  async findAll(): Promise<Area[]> {
    const areasOrm = await this.repository.find({ relations: ['sitio', 'sitio.centro'] });
    return areasOrm.map(AreaMapper.toDomain);
  }

  async findById(id: number): Promise<Area | null> {
    const areaOrm = await this.repository.findOne({ where: { id_area: id }, relations: ['sitio', 'sitio.centro'] });
    if (!areaOrm) return null;
    return AreaMapper.toDomain(areaOrm);
  }

  async create(areaData: Partial<Omit<Area, 'id_area' | 'sitio'>>): Promise<Area> {
    const ormEntity = AreaMapper.toEntity(areaData);
    const saved = await this.repository.save(ormEntity);
    return this.findById(saved.id_area) as Promise<Area>;
  }

  async update(id: number, areaData: Partial<Area>): Promise<Area> {
    await this.repository.update(id, AreaMapper.toEntity(areaData as any));
    const updated = await this.findById(id);
    return updated!;
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
