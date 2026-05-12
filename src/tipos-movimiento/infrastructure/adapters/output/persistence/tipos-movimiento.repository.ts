import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ITiposMovimientoRepository } from '../../../../domain/ports/output/tipos-movimiento-repository.interface';
import { TipoMovimientoOrmEntity } from '../../../entities/tipo-movimiento.orm-entity';
import { TipoMovimientoMapper } from '../../../mappers/tipo-movimiento.mapper';
import { TipoMovimiento } from '../../../../domain/entities/tipo-movimiento.domain.entity';

@Injectable()
export class TiposMovimientoRepositoryAdapter implements ITiposMovimientoRepository {
  constructor(
    @InjectRepository(TipoMovimientoOrmEntity)
    private readonly repository: Repository<TipoMovimientoOrmEntity>,
  ) {}

  async findAll(): Promise<TipoMovimiento[]> {
    const tiposOrm = await this.repository.find();
    return tiposOrm.map(TipoMovimientoMapper.toDomain);
  }

  async create(tipoData: Omit<TipoMovimiento, 'id_tipo_movimiento'>): Promise<TipoMovimiento> {
    const ormEntity = TipoMovimientoMapper.toEntity(tipoData);
    const saved = await this.repository.save(ormEntity);
    return TipoMovimientoMapper.toDomain(saved);
  }
}
