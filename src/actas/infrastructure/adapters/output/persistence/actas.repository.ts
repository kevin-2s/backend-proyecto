import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IActasRepository } from '../../../../domain/ports/output/actas-repository.interface';
import { ActaOrmEntity } from '../../../entities/acta.orm-entity';
import { ActaMapper } from '../../../mappers/acta.mapper';
import { Acta } from '../../../../domain/entities/acta.domain.entity';

@Injectable()
export class ActasRepositoryAdapter implements IActasRepository {
  constructor(
    @InjectRepository(ActaOrmEntity)
    private readonly repository: Repository<ActaOrmEntity>,
  ) {}

  async findAll(): Promise<Acta[]> {
    const actasOrm = await this.repository.find({ relations: ['solicitud', 'usuario'] });
    return actasOrm.map(ActaMapper.toDomain);
  }

  async findById(id: number): Promise<Acta | null> {
    const actaOrm = await this.repository.findOne({ where: { id_acta: id }, relations: ['solicitud', 'usuario'] });
    if (!actaOrm) return null;
    return ActaMapper.toDomain(actaOrm);
  }

  async create(actaData: Omit<Acta, 'id_acta' | 'solicitud'>): Promise<Acta> {
    const ormEntity = ActaMapper.toEntity(actaData);
    const saved = await this.repository.save(ormEntity);
    return ActaMapper.toDomain(saved);
  }
}
