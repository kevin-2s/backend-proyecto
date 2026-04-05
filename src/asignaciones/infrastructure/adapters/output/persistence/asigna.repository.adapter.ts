import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AsignaRepositoryPort, PaginatedResult } from '../../../../domain/ports/output/asigna.repository.port';
import { Asigna } from '../../../../domain/entities/asigna.entity';
import { AsignaEntity } from '../../../entities/asigna.typeorm.entity';
import { AsignaMapper } from '../../../mappers/asigna.mapper';

@Injectable()
export class AsignaRepositoryAdapter implements AsignaRepositoryPort {
    constructor(
        @InjectRepository(AsignaEntity)
        private readonly repository: Repository<AsignaEntity>
    ) {}

    async findAll(page: number, limit: number): Promise<PaginatedResult<Asigna>> {
        const [entities, total] = await this.repository.findAndCount({ skip: (page - 1) * limit, take: limit });
        return { data: entities.map(AsignaMapper.toDomain), total, page, limit };
    }

    async findById(id: string): Promise<Asigna | null> {
        const entity = await this.repository.findOne({ where: { id: parseInt(id, 10) } });
        return entity ? AsignaMapper.toDomain(entity) : null;
    }

    async save(domain: Asigna): Promise<Asigna> {
        let entity = AsignaMapper.toEntity(domain);
        const saved = await this.repository.save(entity);
        return AsignaMapper.toDomain(saved);
    }
}
