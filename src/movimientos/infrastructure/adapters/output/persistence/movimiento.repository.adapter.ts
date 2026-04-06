import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MovimientoRepositoryPort, PaginatedResult } from '../../../../domain/ports/output/movimiento.repository.port';
import { Movimiento } from '../../../../domain/entities/movimiento.entity';
import { MovimientoEntity } from '../../../entities/movimiento.typeorm.entity';
import { MovimientoMapper } from '../../../mappers/movimiento.mapper';

@Injectable()
export class MovimientoRepositoryAdapter implements MovimientoRepositoryPort {
    constructor(
        @InjectRepository(MovimientoEntity)
        private readonly repository: Repository<MovimientoEntity>
    ) {}

    async findAll(page: number, limit: number): Promise<PaginatedResult<Movimiento>> {
        const [entities, total] = await this.repository.findAndCount({ skip: (page - 1) * limit, take: limit });
        return { data: entities.map(MovimientoMapper.toDomain), total, page, limit };
    }

    async findById(id: string): Promise<Movimiento | null> {
        const entity = await this.repository.findOne({ where: { id: parseInt(id, 10) } });
        return entity ? MovimientoMapper.toDomain(entity) : null;
    }

    async save(domain: Movimiento): Promise<Movimiento> {
        let entity = MovimientoMapper.toEntity(domain);
        const saved = await this.repository.save(entity);
        return MovimientoMapper.toDomain(saved);
    }
}
