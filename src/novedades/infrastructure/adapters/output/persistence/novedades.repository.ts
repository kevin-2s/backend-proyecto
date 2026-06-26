import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { INovedadesRepository } from '../../../../domain/ports/output/novedades-repository.interface';
import { NovedadOrmEntity } from '../../../entities/novedad.orm-entity';
import { NovedadMapper } from '../../../mappers/novedad.mapper';
import { Novedad } from '../../../../domain/entities/novedad.domain.entity';

const RELATIONS = ['item', 'item.producto', 'usuario'];

@Injectable()
export class NovedadesRepositoryAdapter implements INovedadesRepository {
  constructor(
    @InjectRepository(NovedadOrmEntity)
    private readonly repository: Repository<NovedadOrmEntity>,
  ) {}

  async findAll(): Promise<Novedad[]> {
    const rows = await this.repository.find({ relations: RELATIONS, order: { fecha: 'DESC' } });
    return rows.map(NovedadMapper.toDomain);
  }

  async findByItem(id_item: number): Promise<Novedad[]> {
    const rows = await this.repository.find({
      where: { id_item },
      relations: RELATIONS,
      order: { fecha: 'DESC' },
    });
    return rows.map(NovedadMapper.toDomain);
  }

  async findById(id: number): Promise<Novedad | null> {
    const row = await this.repository.findOne({ where: { id_novedad: id }, relations: RELATIONS });
    if (!row) return null;
    return NovedadMapper.toDomain(row);
  }

  async create(data: Omit<Novedad, 'id_novedad' | 'item' | 'usuario'>): Promise<Novedad> {
    const orm = NovedadMapper.toEntity(data);
    const saved = await this.repository.save(orm);
    return this.findById(saved.id_novedad) as Promise<Novedad>;
  }

  async update(id: number, data: Partial<Novedad>): Promise<Novedad> {
    await this.repository.update(id, NovedadMapper.toEntity(data));
    return this.findById(id) as Promise<Novedad>;
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
