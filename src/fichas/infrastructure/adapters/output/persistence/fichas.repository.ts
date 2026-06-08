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
    const fichasOrm = await this.repository.find({ relations: ['responsable', 'programa', 'programa.area'] });
    return fichasOrm.map(FichaMapper.toDomain);
  }

  async findById(id: number): Promise<Ficha | null> {
    const fichaOrm = await this.repository.findOne({ where: { id_ficha: id }, relations: ['responsable', 'programa', 'programa.area'] });
    if (!fichaOrm) return null;
    return FichaMapper.toDomain(fichaOrm);
  }

  async create(fichaData: Omit<Ficha, 'id_ficha' | 'responsable'>): Promise<Ficha> {
    const ormEntity = FichaMapper.toEntity(fichaData);
    const saved = await this.repository.save(ormEntity);
    const savedWithRelations = await this.repository.findOne({ where: { id_ficha: saved.id_ficha }, relations: ['responsable', 'programa', 'programa.area'] });
    return FichaMapper.toDomain(savedWithRelations ?? saved);
  }

  async update(id: number, data: Partial<Ficha>): Promise<Ficha> {
    const ormEntity = FichaMapper.toEntity(data);
    await this.repository.update(id, ormEntity);
    const updated = await this.findById(id);
    if (!updated) throw new Error('Ficha no encontrada después de actualizar');
    return updated;
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
