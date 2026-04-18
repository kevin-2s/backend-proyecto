import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IDevolucionesRepository } from '../../../../domain/ports/output/devoluciones-repository.interface';
import { DevolucionOrmEntity } from '../../../entities/devolucion.orm-entity';
import { DevolucionMapper } from '../../../mappers/devolucion.mapper';
import { Devolucion } from '../../../../domain/entities/devolucion.domain.entity';

@Injectable()
export class DevolucionesRepositoryAdapter implements IDevolucionesRepository {
  constructor(
    @InjectRepository(DevolucionOrmEntity)
    private readonly repository: Repository<DevolucionOrmEntity>,
  ) {}

  async findAll(): Promise<Devolucion[]> {
    const devolucionesOrm = await this.repository.find({ relations: ['solicitud', 'usuario_recibe'] });
    return devolucionesOrm.map(DevolucionMapper.toDomain);
  }

  async findById(id: number): Promise<Devolucion | null> {
    const devolucionOrm = await this.repository.findOne({ where: { id_devolucion: id }, relations: ['solicitud', 'usuario_recibe'] });
    if (!devolucionOrm) return null;
    return DevolucionMapper.toDomain(devolucionOrm);
  }

  async create(devolucionData: Omit<Devolucion, 'id_devolucion' | 'solicitud' | 'usuario_recibe'>): Promise<Devolucion> {
    const ormEntity = DevolucionMapper.toOrm(devolucionData);
    const saved = await this.repository.save(ormEntity);
    return DevolucionMapper.toDomain(saved);
  }
}
