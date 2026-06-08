import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PrestamoOrmEntity } from '../../../entities/prestamo.orm-entity';
import { PrestamoDomainEntity } from '../../../../domain/entities/prestamo.domain.entity';
import { PrestamosRepositoryInterface } from '../../../../domain/ports/output/prestamos-repository.interface';
import { PrestamoMapper } from '../../../mappers/prestamo.mapper';

@Injectable()
export class PrestamosRepository implements PrestamosRepositoryInterface {
  constructor(
    @InjectRepository(PrestamoOrmEntity)
    private readonly ormRepository: Repository<PrestamoOrmEntity>,
  ) {}

  async create(prestamo: PrestamoDomainEntity): Promise<PrestamoDomainEntity> {
    const ormEntity = PrestamoMapper.toOrmEntity(prestamo);
    const saved = await this.ormRepository.save(ormEntity);
    return PrestamoMapper.toDomainEntity(saved);
  }

  async findAll(): Promise<PrestamoDomainEntity[]> {
    const entities = await this.ormRepository.find({
      relations: ['item', 'item.producto', 'usuario'],
      order: { fecha_prestamo: 'DESC' },
    });
    return entities.map(PrestamoMapper.toDomainEntity);
  }

  async findActivos(): Promise<PrestamoDomainEntity[]> {
    const entities = await this.ormRepository.find({
      where: { estado: 'ACTIVO' },
      relations: ['item', 'item.producto', 'usuario'],
      order: { fecha_devolucion_esperada: 'ASC' },
    });
    return entities.map(PrestamoMapper.toDomainEntity);
  }

  async findById(id: number): Promise<PrestamoDomainEntity | null> {
    const entity = await this.ormRepository.findOne({
      where: { id_prestamo: id },
      relations: ['item', 'item.producto', 'usuario'],
    });
    if (!entity) return null;
    return PrestamoMapper.toDomainEntity(entity);
  }

  async update(id: number, prestamo: Partial<PrestamoDomainEntity>): Promise<PrestamoDomainEntity | null> {
    await this.ormRepository.update(id, prestamo);
    return this.findById(id);
  }
}
