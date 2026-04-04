import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoriaRepositoryPort, PaginatedResult } from '../../../../domain/ports/output/categoria.repository.port';
import { Categoria } from '../../../../domain/entities/categoria.entity';
import { CategoriaEntity } from '../../../entities/categoria.typeorm.entity';
import { CategoriaMapper } from '../../../mappers/categoria.mapper';

@Injectable()
export class CategoriaRepositoryAdapter implements CategoriaRepositoryPort {
    constructor(
        @InjectRepository(CategoriaEntity)
        private readonly repository: Repository<CategoriaEntity>
    ) {}

    async findAll(page: number, limit: number): Promise<PaginatedResult<Categoria>> {
        const [entities, total] = await this.repository.findAndCount({ skip: (page - 1) * limit, take: limit });
        return { data: entities.map(CategoriaMapper.toDomain), total, page, limit };
    }

    async findById(id: string): Promise<Categoria | null> {
        const entity = await this.repository.findOne({ where: { id: id as any } });
        return entity ? CategoriaMapper.toDomain(entity) : null;
    }

    async save(domain: Categoria): Promise<Categoria> {
        let entity = CategoriaMapper.toEntity(domain);
        const saved = await this.repository.save(entity);
        return CategoriaMapper.toDomain(saved);
    }
}
