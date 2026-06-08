import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ISedesRepository } from '../../../../domain/ports/output/sedes-repository.interface';
import { SedeOrmEntity } from '../../../entities/sede.orm-entity';
import { SedeMapper } from '../../../mappers/sede.mapper';
import { Sede } from '../../../../domain/entities/sede.domain.entity';

@Injectable()
export class SedesRepositoryAdapter implements ISedesRepository {
  constructor(
    @InjectRepository(SedeOrmEntity)
    private readonly repository: Repository<SedeOrmEntity>,
  ) {}

  async findAll(): Promise<Sede[]> {
    const sedesOrm = await this.repository.find({ relations: ['centro'] });
    return sedesOrm.map(SedeMapper.toDomain);
  }

  async findById(id: number): Promise<Sede | null> {
    const sedeOrm = await this.repository.findOne({ where: { id_sede: id }, relations: ['centro'] });
    if (!sedeOrm) return null;
    return SedeMapper.toDomain(sedeOrm);
  }

  async create(sedeData: Partial<Omit<Sede, 'id_sede' | 'centro'>>): Promise<Sede> {
    const ormEntity = SedeMapper.toEntity(sedeData);
    const saved = await this.repository.save(ormEntity);
    return this.findById(saved.id_sede) as any;
  }

  async update(id: number, SedeData: Partial<Sede>): Promise<Sede> {
    await this.repository.update(id, SedeMapper.toEntity(SedeData));
    const updated = await this.findById(id);
    return updated!;
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
