import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductoRepositoryPort, PaginatedResult } from '../../../../domain/ports/output/producto.repository.port';
import { Producto } from '../../../../domain/entities/producto.entity';
import { ProductoEntity } from '../../../entities/producto.typeorm.entity';
import { ProductoMapper } from '../../../mappers/producto.mapper';

@Injectable()
export class ProductoRepositoryAdapter implements ProductoRepositoryPort {
    constructor(
        @InjectRepository(ProductoEntity)
        private readonly repository: Repository<ProductoEntity>
    ) {}

    async findAll(page: number, limit: number): Promise<PaginatedResult<Producto>> {
        const [entities, total] = await this.repository.findAndCount({ skip: (page - 1) * limit, take: limit });
        return { data: entities.map(ProductoMapper.toDomain), total, page, limit };
    }

    async findById(id: string): Promise<Producto | null> {
        const entity = await this.repository.findOne({ where: { id: parseInt(id, 10) } });
        return entity ? ProductoMapper.toDomain(entity) : null;
    }

    async save(domain: Producto): Promise<Producto> {
        let entity = ProductoMapper.toEntity(domain);
        const saved = await this.repository.save(entity);
        return ProductoMapper.toDomain(saved);
    }
}
