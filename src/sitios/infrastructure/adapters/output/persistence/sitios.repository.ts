import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ISitiosRepository } from '../../../../domain/ports/output/sitios-repository.interface';
import { SitioOrmEntity } from '../../../entities/sitio.orm-entity';
import { SitioMapper } from '../../../mappers/sitio.mapper';
import { Sitio } from '../../../../domain/entities/sitio.domain.entity';

@Injectable()
export class SitiosRepositoryAdapter implements ISitiosRepository {
  constructor(
    @InjectRepository(SitioOrmEntity)
    private readonly repository: Repository<SitioOrmEntity>,
  ) {}

  async findAll(): Promise<Sitio[]> {
    const sitiosOrm = await this.repository.find({ relations: ['responsable', 'centro'] });
    return sitiosOrm.map(SitioMapper.toDomain);
  }

  async findById(id: number): Promise<Sitio | null> {
    const sitioOrm = await this.repository.findOne({ where: { id_sitio: id }, relations: ['responsable', 'centro'] });
    if (!sitioOrm) return null;
    return SitioMapper.toDomain(sitioOrm);
  }

  async create(sitioData: Partial<Omit<Sitio, 'id_sitio' | 'responsable'>>): Promise<Sitio> {
    const ormEntity = SitioMapper.toEntity(sitioData);
    const saved = await this.repository.save(ormEntity);
    return SitioMapper.toDomain(saved);
  }

  async update(id: number, sitioData: Partial<Sitio>): Promise<Sitio> {
    await this.repository.update(id, SitioMapper.toEntity(sitioData as any));
    const updated = await this.findById(id);
    return updated!;
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
