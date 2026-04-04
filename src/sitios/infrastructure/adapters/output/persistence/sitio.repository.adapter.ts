import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SitioRepositoryPort, PaginatedResult } from '../../../../domain/ports/output/sitio.repository.port';
import { Sitio } from '../../../../domain/entities/sitio.entity';
import { SitioEntity } from '../../../entities/sitio.typeorm.entity';
import { SitioMapper } from '../../../mappers/sitio.mapper';

@Injectable()
export class SitioRepositoryAdapter implements SitioRepositoryPort {
    constructor(
        @InjectRepository(SitioEntity)
        private readonly repository: Repository<SitioEntity>
    ) {}

    async findAll(page: number, limit: number): Promise<PaginatedResult<Sitio>> {
        const [entities, total] = await this.repository.findAndCount({ skip: (page - 1) * limit, take: limit });
        return { data: entities.map(SitioMapper.toDomain), total, page, limit };
    }

    async findById(id: string): Promise<Sitio | null> {
        const entity = await this.repository.findOne({ where: { id: id as any } });
        return entity ? SitioMapper.toDomain(entity) : null;
    }

    async save(domain: Sitio): Promise<Sitio> {
        let entity = SitioMapper.toEntity(domain);
        const saved = await this.repository.save(entity);
        return SitioMapper.toDomain(saved);
    }
}
