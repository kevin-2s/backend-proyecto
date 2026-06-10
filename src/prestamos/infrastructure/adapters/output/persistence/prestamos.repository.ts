import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IPrestamosRepository } from '../../../../domain/ports/output/prestamos-repository.interface';
import { Prestamo, EstadoPrestamo } from '../../../../domain/entities/prestamo.domain.entity';
import { PrestamoOrmEntity } from '../../../entities/prestamo.orm-entity';
import { PrestamoMapper } from '../../../mappers/prestamo.mapper';

@Injectable()
export class PrestamosRepositoryAdapter implements IPrestamosRepository {
  constructor(
    @InjectRepository(PrestamoOrmEntity)
    private readonly repo: Repository<PrestamoOrmEntity>,
  ) {}

  async findAll(): Promise<Prestamo[]> {
    const orms = await this.repo.find({
      order: { fecha_prestamo: 'DESC' },
      relations: ['item', 'usuario_solicitante', 'usuario_responsable'],
    });
    return orms.map(PrestamoMapper.toDomain);
  }

  async findById(id: number): Promise<Prestamo | null> {
    const orm = await this.repo.findOne({
      where: { id_prestamo: id },
      relations: ['item', 'usuario_solicitante', 'usuario_responsable'],
    });
    return orm ? PrestamoMapper.toDomain(orm) : null;
  }

  async findActivos(): Promise<Prestamo[]> {
    const orms = await this.repo.find({
      where: { estado: EstadoPrestamo.ACTIVO },
      order: { fecha_prestamo: 'DESC' },
      relations: ['item', 'usuario_solicitante', 'usuario_responsable'],
    });
    return orms.map(PrestamoMapper.toDomain);
  }

  async create(data: Omit<Prestamo, 'id_prestamo'>): Promise<Prestamo> {
    const entity = this.repo.create(PrestamoMapper.toOrm(data));
    const saved = await this.repo.save(entity);
    return PrestamoMapper.toDomain(saved);
  }

  async update(id: number, data: Partial<Prestamo>): Promise<Prestamo> {
    await this.repo.update(id, {
      estado: data.estado,
      fecha_devolucion_real: data.fecha_devolucion_real ?? undefined,
      observacion: data.observacion ?? undefined,
    });
    const updated = await this.repo.findOne({
      where: { id_prestamo: id },
      relations: ['item', 'usuario_solicitante', 'usuario_responsable'],
    });
    return PrestamoMapper.toDomain(updated!);
  }
}
