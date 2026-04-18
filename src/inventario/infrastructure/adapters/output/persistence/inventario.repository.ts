import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IInventarioRepository } from '../../../../domain/ports/output/inventario-repository.interface';
import { InventarioOrmEntity } from '../../../entities/inventario.orm-entity';
import { InventarioMapper } from '../../../mappers/inventario.mapper';
import { Inventario } from '../../../../domain/entities/inventario.domain.entity';

@Injectable()
export class InventarioRepositoryAdapter implements IInventarioRepository {
  constructor(
    @InjectRepository(InventarioOrmEntity)
    private readonly repository: Repository<InventarioOrmEntity>,
  ) {}

  async findAll(): Promise<Inventario[]> {
    const inventarioOrm = await this.repository.find({ relations: ['item', 'sitio'] });
    return inventarioOrm.map(InventarioMapper.toDomain);
  }

  async findById(id: number): Promise<Inventario | null> {
    const inventarioOrm = await this.repository.findOne({ where: { id_inventario: id }, relations: ['item', 'sitio'] });
    if (!inventarioOrm) return null;
    return InventarioMapper.toDomain(inventarioOrm);
  }

  async create(inventarioData: Omit<Inventario, 'id_inventario' | 'item' | 'sitio'>): Promise<Inventario> {
    const ormEntity = InventarioMapper.toOrm(inventarioData);
    const saved = await this.repository.save(ormEntity);
    return InventarioMapper.toDomain(saved);
  }
}
