import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FichaRepositoryPort, PaginatedResult } from '../../../../domain/ports/output/ficha.repository.port';
import { Ficha } from '../../../../domain/entities/ficha.entity';
import { FichaEntity } from '../../../entities/ficha.typeorm.entity';
import { FichaMapper } from '../../../mappers/ficha.mapper';

@Injectable()
export class FichaRepositoryAdapter implements FichaRepositoryPort {
    constructor(
        @InjectRepository(FichaEntity)
        private readonly repository: Repository<FichaEntity>
    ) {}

    async findAll(page: number, limit: number): Promise<PaginatedResult<Ficha>> {
        const [entities, total] = await this.repository.findAndCount({ skip: (page - 1) * limit, take: limit });
        return { data: entities.map(FichaMapper.toDomain), total, page, limit };
    }

    async findById(id: string): Promise<Ficha | null> {
        const entity = await this.repository.findOne({ where: { id: parseInt(id, 10) } });
        return entity ? FichaMapper.toDomain(entity) : null;
    }

    async save(domain: Ficha): Promise<Ficha> {
        let entity = FichaMapper.toEntity(domain);
        const saved = await this.repository.save(entity);
        return FichaMapper.toDomain(saved);
    }
}
