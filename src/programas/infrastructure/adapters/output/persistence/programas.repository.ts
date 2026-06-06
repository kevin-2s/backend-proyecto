import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IProgramasRepository } from '../../../../domain/ports/output/programas-repository.interface';
import { ProgramaOrmEntity } from '../../../entities/programa.orm-entity';
import { ProgramaMapper } from '../../../mappers/programa.mapper';
import { Programa } from '../../../../domain/entities/programa.domain.entity';

@Injectable()
export class ProgramasRepositoryAdapter implements IProgramasRepository {
  constructor(
    @InjectRepository(ProgramaOrmEntity)
    private readonly repository: Repository<ProgramaOrmEntity>,
  ) {}

  async findAll(): Promise<Programa[]> {
    const programasOrm = await this.repository.find({ relations: ['area', 'area.sitio', 'area.sitio.centro'] });
    return programasOrm.map(ProgramaMapper.toDomain);
  }

  async findById(id: number): Promise<Programa | null> {
    const programaOrm = await this.repository.findOne({ where: { id_programa: id }, relations: ['area', 'area.sitio', 'area.sitio.centro'] });
    if (!programaOrm) return null;
    return ProgramaMapper.toDomain(programaOrm);
  }

  async create(programaData: Partial<Omit<Programa, 'id_programa' | 'area'>>): Promise<Programa> {
    const ormEntity = ProgramaMapper.toEntity(programaData);
    const saved = await this.repository.save(ormEntity);
    return this.findById(saved.id_programa) as Promise<Programa>;
  }

  async update(id: number, programaData: Partial<Programa>): Promise<Programa> {
    await this.repository.update(id, ProgramaMapper.toEntity(programaData as any));
    const updated = await this.findById(id);
    return updated!;
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
