import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SolicitudRepositoryPort, PaginatedResult } from '../../../../domain/ports/output/solicitud.repository.port';
import { Solicitud } from '../../../../domain/entities/solicitud.entity';
import { SolicitudEntity } from '../../../entities/solicitud.typeorm.entity';
import { SolicitudMapper } from '../../../mappers/solicitud.mapper';

@Injectable()
export class SolicitudRepositoryAdapter implements SolicitudRepositoryPort {
    constructor(
        @InjectRepository(SolicitudEntity)
        private readonly repository: Repository<SolicitudEntity>
    ) {}

    async findAll(page: number, limit: number): Promise<PaginatedResult<Solicitud>> {
        const [entities, total] = await this.repository.findAndCount({ skip: (page - 1) * limit, take: limit });
        return { data: entities.map(SolicitudMapper.toDomain), total, page, limit };
    }

    async findById(id: string): Promise<Solicitud | null> {
        const entity = await this.repository.findOne({ where: { id: parseInt(id, 10) } });
        return entity ? SolicitudMapper.toDomain(entity) : null;
    }

    async save(domain: Solicitud): Promise<Solicitud> {
        let entity = SolicitudMapper.toEntity(domain);
        const saved = await this.repository.save(entity);
        return SolicitudMapper.toDomain(saved);
    }
}
