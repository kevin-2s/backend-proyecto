import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NecesidadRepositoryPort, PaginatedResult } from '../../../../domain/ports/output/necesidad.repository.port';
import { Necesidad } from '../../../../domain/entities/necesidad.entity';
import { NecesidadEntity } from '../../../entities/necesidad.typeorm.entity';
import { NecesidadMapper } from '../../../mappers/necesidad.mapper';

@Injectable()
export class NecesidadRepositoryAdapter implements NecesidadRepositoryPort {
    constructor(
        @InjectRepository(NecesidadEntity)
        private readonly repository: Repository<NecesidadEntity>
    ) {}

    async findAll(page: number, limit: number): Promise<PaginatedResult<Necesidad>> {
        const [entities, total] = await this.repository.findAndCount({ skip: (page - 1) * limit, take: limit });
        return { data: entities.map(NecesidadMapper.toDomain), total, page, limit };
    }

    async findById(id: string): Promise<Necesidad | null> {
        const entity = await this.repository.findOne({ where: { id: parseInt(id, 10) } });
        return entity ? NecesidadMapper.toDomain(entity) : null;
    }

    async save(domain: Necesidad): Promise<Necesidad> {
        let entity = NecesidadMapper.toEntity(domain);
        const saved = await this.repository.save(entity);
        return NecesidadMapper.toDomain(saved);
    }
}
