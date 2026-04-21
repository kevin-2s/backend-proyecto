import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IKardexRepository } from '../../../../domain/ports/output/kardex-repository.interface';
import { KardexOrmEntity } from '../../../entities/kardex.orm-entity';
import { KardexMapper } from '../../../mappers/kardex.mapper';
import { Kardex } from '../../../../domain/entities/kardex.domain.entity';

@Injectable()
export class KardexRepositoryAdapter implements IKardexRepository {
  constructor(
    @InjectRepository(KardexOrmEntity)
    private readonly repository: Repository<KardexOrmEntity>,
  ) {}

  async findAll(): Promise<Kardex[]> {
    const kardexOrm = await this.repository.find({ relations: ['item', 'usuario'] });
    return kardexOrm.map(KardexMapper.toDomain);
  }

  async findByItemId(id_item: number): Promise<Kardex[]> {
    const kardexOrm = await this.repository.find({
      where: { id_item },
      relations: ['item', 'usuario'],
      order: { fecha: 'ASC' }
    });
    return kardexOrm.map(KardexMapper.toDomain);
  }

  async create(kardexData: Omit<Kardex, 'id_kardex' | 'item' | 'usuario'>): Promise<Kardex> {
    const ormEntity = KardexMapper.toEntity(kardexData);
    const saved = await this.repository.save(ormEntity);
    return KardexMapper.toDomain(saved);
  }
}
