import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DevolucionRepositoryPort, PaginatedResult } from '../../../../domain/ports/output/devolucion.repository.port';
import { Devolucion } from '../../../../domain/entities/devolucion.entity';
import { DevolucionEntity } from '../../../entities/devolucion.typeorm.entity';
import { DevolucionMapper } from '../../../mappers/devolucion.mapper';

@Injectable()
export class DevolucionRepositoryAdapter implements DevolucionRepositoryPort {
    constructor(
        @InjectRepository(DevolucionEntity)
        private readonly repository: Repository<DevolucionEntity>
    ) {}

    async findAll(page: number, limit: number): Promise<PaginatedResult<Devolucion>> {
        const [entities, total] = await this.repository.findAndCount({ skip: (page - 1) * limit, take: limit });
        return { data: entities.map(DevolucionMapper.toDomain), total, page, limit };
    }

    async findById(id: string): Promise<Devolucion | null> {
        const entity = await this.repository.findOne({ where: { id: parseInt(id, 10) } });
        return entity ? DevolucionMapper.toDomain(entity) : null;
    }

    async save(domain: Devolucion): Promise<Devolucion> {
        let entity = DevolucionMapper.toEntity(domain);
        const saved = await this.repository.save(entity);
        return DevolucionMapper.toDomain(saved);
    }
}
