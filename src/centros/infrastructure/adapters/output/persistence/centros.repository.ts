import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ICentrosRepository } from '../../../../domain/ports/output/centros-repository.interface';
import { CentroOrmEntity } from '../../../entities/centro.orm-entity';
import { CentroMapper } from '../../../mappers/centro.mapper';
import { Centro } from '../../../../domain/entities/centro.domain.entity';

@Injectable()
export class CentrosRepositoryAdapter implements ICentrosRepository {
  constructor(
    @InjectRepository(CentroOrmEntity)
    private readonly repository: Repository<CentroOrmEntity>,
  ) {}

  async findAll(): Promise<Centro[]> {
    const centrosOrm = await this.repository.find();
    return centrosOrm.map(CentroMapper.toDomain);
  }

  async findById(id: number): Promise<Centro | null> {
    const centroOrm = await this.repository.findOne({ where: { id_centro: id } });
    if (!centroOrm) return null;
    return CentroMapper.toDomain(centroOrm);
  }

  async create(centroData: Partial<Omit<Centro, 'id_centro'>>): Promise<Centro> {
    const ormEntity = CentroMapper.toEntity(centroData);
    const saved = await this.repository.save(ormEntity);
    return CentroMapper.toDomain(saved);
  }

  async update(id: number, centroData: Partial<Centro>): Promise<Centro> {
    await this.repository.update(id, CentroMapper.toEntity(centroData as any));
    const updated = await this.findById(id);
    return updated!;
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
