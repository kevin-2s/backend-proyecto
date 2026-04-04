import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ActaRepositoryPort, PaginatedResult } from '../../../../domain/ports/output/acta.repository.port';
import { Acta } from '../../../../domain/entities/acta.entity';
import { ActaEntity } from '../../../entities/acta.typeorm.entity';
import { ActaMapper } from '../../../mappers/acta.mapper';

@Injectable()
export class ActaRepositoryAdapter implements ActaRepositoryPort {
    constructor(
        @InjectRepository(ActaEntity)
        private readonly repository: Repository<ActaEntity>
    ) {}

    async findAll(page: number, limit: number): Promise<PaginatedResult<Acta>> {
        const [entities, total] = await this.repository.findAndCount({ skip: (page - 1) * limit, take: limit });
        return { data: entities.map(ActaMapper.toDomain), total, page, limit };
    }

    async findById(id: string): Promise<Acta | null> {
        const entity = await this.repository.findOne({ where: { id: id as any } });
        return entity ? ActaMapper.toDomain(entity) : null;
    }

    async save(domain: Acta): Promise<Acta> {
        let entity = ActaMapper.toEntity(domain);
        const saved = await this.repository.save(entity);
        return ActaMapper.toDomain(saved);
    }
}
