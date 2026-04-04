import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotificacionRepositoryPort, PaginatedResult } from '../../../../domain/ports/output/notificacion.repository.port';
import { Notificacion } from '../../../../domain/entities/notificacion.entity';
import { NotificacionEntity } from '../../../entities/notificacion.typeorm.entity';
import { NotificacionMapper } from '../../../mappers/notificacion.mapper';

@Injectable()
export class NotificacionRepositoryAdapter implements NotificacionRepositoryPort {
    constructor(
        @InjectRepository(NotificacionEntity)
        private readonly repository: Repository<NotificacionEntity>
    ) {}

    async findAll(page: number, limit: number): Promise<PaginatedResult<Notificacion>> {
        const [entities, total] = await this.repository.findAndCount({ skip: (page - 1) * limit, take: limit });
        return { data: entities.map(NotificacionMapper.toDomain), total, page, limit };
    }

    async findById(id: string): Promise<Notificacion | null> {
        const entity = await this.repository.findOne({ where: { id: id as any } });
        return entity ? NotificacionMapper.toDomain(entity) : null;
    }

    async save(domain: Notificacion): Promise<Notificacion> {
        let entity = NotificacionMapper.toEntity(domain);
        const saved = await this.repository.save(entity);
        return NotificacionMapper.toDomain(saved);
    }
}
