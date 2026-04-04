import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReporteRepositoryPort, PaginatedResult } from '../../../../domain/ports/output/reporte.repository.port';
import { Reporte } from '../../../../domain/entities/reporte.entity';
import { ReporteEntity } from '../../../entities/reporte.typeorm.entity';
import { ReporteMapper } from '../../../mappers/reporte.mapper';

@Injectable()
export class ReporteRepositoryAdapter implements ReporteRepositoryPort {
    constructor(
        @InjectRepository(ReporteEntity)
        private readonly repository: Repository<ReporteEntity>
    ) {}

    async findAll(page: number, limit: number): Promise<PaginatedResult<Reporte>> {
        const [entities, total] = await this.repository.findAndCount({ skip: (page - 1) * limit, take: limit });
        return { data: entities.map(ReporteMapper.toDomain), total, page, limit };
    }

    async findById(id: string): Promise<Reporte | null> {
        const entity = await this.repository.findOne({ where: { id: id as any } });
        return entity ? ReporteMapper.toDomain(entity) : null;
    }

    async save(domain: Reporte): Promise<Reporte> {
        let entity = ReporteMapper.toEntity(domain);
        const saved = await this.repository.save(entity);
        return ReporteMapper.toDomain(saved);
    }
}
