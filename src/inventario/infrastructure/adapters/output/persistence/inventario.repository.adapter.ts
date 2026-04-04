import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InventarioRepositoryPort, PaginatedResult } from '../../../../domain/ports/output/inventario.repository.port';
import { Inventario } from '../../../../domain/entities/inventario.entity';
import { InventarioEntity } from '../../../entities/inventario.typeorm.entity';
import { InventarioMapper } from '../../../mappers/inventario.mapper';

@Injectable()
export class InventarioRepositoryAdapter implements InventarioRepositoryPort {
    constructor(
        @InjectRepository(InventarioEntity)
        private readonly repository: Repository<InventarioEntity>
    ) {}

    async findAll(page: number, limit: number): Promise<PaginatedResult<Inventario>> {
        const [entities, total] = await this.repository.findAndCount({ skip: (page - 1) * limit, take: limit });
        return { data: entities.map(InventarioMapper.toDomain), total, page, limit };
    }

    async findById(id: string): Promise<Inventario | null> {
        const entity = await this.repository.findOne({ where: { id: id as any } });
        return entity ? InventarioMapper.toDomain(entity) : null;
    }

    async save(domain: Inventario): Promise<Inventario> {
        let entity = InventarioMapper.toEntity(domain);
        const saved = await this.repository.save(entity);
        return InventarioMapper.toDomain(saved);
    }
}
