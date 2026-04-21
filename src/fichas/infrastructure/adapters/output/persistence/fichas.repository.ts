import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IFichasRepository } from '../../../../domain/ports/output/fichas-repository.interface';
import { FichaOrmEntity } from '../../../entities/ficha.orm-entity';
import { FichaMapper } from '../../../mappers/ficha.mapper';
import { Ficha } from '../../../../domain/entities/ficha.domain.entity';

@Injectable()
export class FichasRepositoryAdapter implements IFichasRepository {
  constructor(
    @InjectRepository(FichaOrmEntity)
    private readonly repository: Repository<FichaOrmEntity>,
  ) {}

  async findAll(): Promise<Ficha[]> {
    const fichasOrm = await this.repository.find({ relations: ['responsable'] });
    return fichasOrm.map(FichaMapper.toDomain);
  }

  async findById(id: number): Promise<Ficha | null> {
    const fichaOrm = await this.repository.findOne({ where: { id_ficha: id }, relations: ['responsable'] });
    if (!fichaOrm) return null;
    return FichaMapper.toDomain(fichaOrm);
  }

  async create(fichaData: Omit<Ficha, 'id_ficha' | 'responsable'>): Promise<Ficha> {
    const ormEntity = FichaMapper.toEntity(fichaData);
    const saved = await this.repository.save(ormEntity);
    return FichaMapper.toDomain(saved);
  }
}
