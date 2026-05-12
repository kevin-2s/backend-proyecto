import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ISolicitudesRepository } from '../../../../domain/ports/output/solicitudes-repository.interface';
import { SolicitudOrmEntity } from '../../../entities/solicitud.orm-entity';
import { SolicitudMapper } from '../../../mappers/solicitud.mapper';
import { Solicitud } from '../../../../domain/entities/solicitud.domain.entity';

@Injectable()
export class SolicitudesRepositoryAdapter implements ISolicitudesRepository {
  constructor(
    @InjectRepository(SolicitudOrmEntity)
    private readonly repository: Repository<SolicitudOrmEntity>,
  ) {}

  async findAll(): Promise<Solicitud[]> {
    const solicitudesOrm = await this.repository.find({ relations: ['usuario', 'usuario_aprueba', 'ficha'] });
    return solicitudesOrm.map(SolicitudMapper.toDomain);
  }

  async findById(id: number): Promise<Solicitud | null> {
    const solicitudOrm = await this.repository.findOne({ where: { id_solicitud: id }, relations: ['usuario', 'usuario_aprueba', 'ficha'] });
    if (!solicitudOrm) return null;
    return SolicitudMapper.toDomain(solicitudOrm);
  }

  async create(solicitudData: Omit<Solicitud, 'id_solicitud' | 'usuario' | 'usuario_aprueba' | 'ficha'>): Promise<Solicitud> {
    const ormEntity = SolicitudMapper.toEntity(solicitudData);
    const saved = await this.repository.save(ormEntity);
    return SolicitudMapper.toDomain(saved);
  }

  async update(id: number, solicitudData: Partial<Solicitud>): Promise<Solicitud> {
    await this.repository.update(id, solicitudData);
    return this.findById(id) as Promise<Solicitud>;
  }
}
