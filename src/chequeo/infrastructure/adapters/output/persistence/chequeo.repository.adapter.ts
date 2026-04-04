import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChequeoRepositoryPort, PaginatedResult } from '../../../../domain/ports/output/chequeo.repository.port';
import { Chequeo } from '../../../../domain/entities/chequeo.entity';
import { ChequeoEntity } from '../../../entities/chequeo.typeorm.entity';
import { ChequeoMapper } from '../../../mappers/chequeo.mapper';

@Injectable()
export class ChequeoRepositoryAdapter implements ChequeoRepositoryPort {
    constructor(
        @InjectRepository(ChequeoEntity)
        private readonly repository: Repository<ChequeoEntity>
    ) {}

    async findAll(page: number, limit: number): Promise<PaginatedResult<Chequeo>> {
        const [entities, total] = await this.repository.findAndCount({ skip: (page - 1) * limit, take: limit });
        return { data: entities.map(ChequeoMapper.toDomain), total, page, limit };
    }

    async findById(id: string): Promise<Chequeo | null> {
        const entity = await this.repository.findOne({ where: { id: id as any } });
        return entity ? ChequeoMapper.toDomain(entity) : null;
    }

    async save(domain: Chequeo): Promise<Chequeo> {
        let entity = ChequeoMapper.toEntity(domain);
        const saved = await this.repository.save(entity);
        return ChequeoMapper.toDomain(saved);
    }
}
