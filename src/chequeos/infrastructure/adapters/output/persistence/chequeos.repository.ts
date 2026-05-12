import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IChequeosRepository } from '../../../../domain/ports/output/chequeos-repository.interface';
import { ChequeoOrmEntity } from '../../../entities/chequeo.orm-entity';
import { ChequeoMapper } from '../../../mappers/chequeo.mapper';
import { Chequeo } from '../../../../domain/entities/chequeo.domain.entity';

@Injectable()
export class ChequeosRepositoryAdapter implements IChequeosRepository {
  constructor(
    @InjectRepository(ChequeoOrmEntity)
    private readonly repository: Repository<ChequeoOrmEntity>,
  ) {}

  async findAll(): Promise<Chequeo[]> {
    const chequeosOrm = await this.repository.find({ relations: ['usuario'] });
    return chequeosOrm.map(ChequeoMapper.toDomain);
  }

  async findById(id: number): Promise<Chequeo | null> {
    const chequeoOrm = await this.repository.findOne({ where: { id_chequeo: id }, relations: ['usuario'] });
    if (!chequeoOrm) return null;
    return ChequeoMapper.toDomain(chequeoOrm);
  }

  async create(chequeoData: Omit<Chequeo, 'id_chequeo' | 'usuario'>): Promise<Chequeo> {
    const ormEntity = ChequeoMapper.toEntity(chequeoData);
    const saved = await this.repository.save(ormEntity);
    return ChequeoMapper.toDomain(saved);
  }
}
