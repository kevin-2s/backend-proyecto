import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IMovimientosRepository } from '../../../../domain/ports/output/movimientos-repository.interface';
import { MovimientoOrmEntity } from '../../../entities/movimiento.orm-entity';
import { MovimientoMapper } from '../../../mappers/movimiento.mapper';
import { Movimiento } from '../../../../domain/entities/movimiento.domain.entity';

@Injectable()
export class MovimientosRepositoryAdapter implements IMovimientosRepository {
  constructor(
    @InjectRepository(MovimientoOrmEntity)
    private readonly repository: Repository<MovimientoOrmEntity>,
  ) {}

  async findAll(): Promise<Movimiento[]> {
    const movimientosOrm = await this.repository.find({ relations: ['item', 'tipoMovimiento', 'usuario'] });
    return movimientosOrm.map(MovimientoMapper.toDomain);
  }

  async findById(id: number): Promise<Movimiento | null> {
    const movimientoEntity = await this.repository.findOne({ where: { id_movimiento: id }, relations: ['item', 'tipoMovimiento', 'usuario'] });
    if (!movimientoEntity) return null;
    return MovimientoMapper.toDomain(movimientoEntity);
  }

  async create(movimientoData: Omit<Movimiento, 'id_movimiento' | 'item' | 'tipoMovimiento' | 'usuario'>): Promise<Movimiento> {
    const ormEntity = MovimientoMapper.toEntity(movimientoData);
    const saved = await this.repository.save(ormEntity);
    return MovimientoMapper.toDomain(saved);
  }

  async findByFechaAndTipo(fechaInicio: Date, fechaFin: Date, tipo?: string): Promise<any[]> {
    const query = this.repository.createQueryBuilder('movimiento')
      .leftJoinAndSelect('movimiento.item', 'item')
      .leftJoinAndSelect('item.producto', 'producto')
      .leftJoinAndSelect('movimiento.tipoMovimiento', 'tipoMovimiento')
      .leftJoinAndSelect('movimiento.usuario', 'usuario')
      .where('movimiento.fecha BETWEEN :fechaInicio AND :fechaFin', { fechaInicio, fechaFin });
    
    if (tipo) {
      query.andWhere('tipoMovimiento.nombre = :tipo', { tipo });
    }
    
    return query.orderBy('movimiento.fecha', 'DESC').getMany();
  }
}
