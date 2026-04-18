import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IDetalleSolicitudRepository } from '../../../../domain/ports/output/detalle-solicitud-repository.interface';
import { DetalleSolicitudOrmEntity } from '../../../entities/detalle-solicitud.orm-entity';
import { DetalleSolicitudMapper } from '../../../mappers/detalle-solicitud.mapper';
import { DetalleSolicitud } from '../../../../domain/entities/detalle-solicitud.domain.entity';

@Injectable()
export class DetalleSolicitudRepositoryAdapter implements IDetalleSolicitudRepository {
  constructor(
    @InjectRepository(DetalleSolicitudOrmEntity)
    private readonly repository: Repository<DetalleSolicitudOrmEntity>,
  ) {}

  async findAll(): Promise<DetalleSolicitud[]> {
    const ormList = await this.repository.find({ relations: ['solicitud', 'producto'] });
    return ormList.map(DetalleSolicitudMapper.toDomain);
  }

  async create(detalleData: Omit<DetalleSolicitud, 'id_detalle' | 'solicitud' | 'producto'>): Promise<DetalleSolicitud> {
    const ormEntity = DetalleSolicitudMapper.toOrm(detalleData);
    const saved = await this.repository.save(ormEntity);
    return DetalleSolicitudMapper.toDomain(saved);
  }
}
