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
    const areasOrm = await this.repository.find();
    return areasOrm.map(AreaMapper.toDomain);
  }

  async findById(id: number): Promise<Area | null> {
    const areaOrm = await this.repository.findOne({ where: { id_area: id } });
    if (!areaOrm) return null;
    return AreaMapper.toDomain(areaOrm);
  }

  async create(areaData: Partial<Omit<Area, 'id_area'>>): Promise<Area> {
    const ormEntity = AreaMapper.toEntity(areaData);
    const saved = await this.repository.save(ormEntity);
    return AreaMapper.toDomain(saved);
  }

  async update(id: number, areaData: Partial<Area>): Promise<Area> {
    await this.repository.update(id, AreaMapper.toEntity(areaData));
    const updated = await this.findById(id);
    return updated!;
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
