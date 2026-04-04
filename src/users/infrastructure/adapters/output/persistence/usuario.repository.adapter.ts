import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsuarioRepositoryPort, PaginatedResult } from '../../../../domain/ports/output/usuario.repository.port';
import { Usuario } from '../../../../domain/entities/usuario.entity';
import { UsuarioEntity } from '../../../entities/usuario.typeorm.entity';
import { UsuarioMapper } from '../../../mappers/usuario.mapper';

@Injectable()
export class UsuarioRepositoryAdapter implements UsuarioRepositoryPort {
    constructor(
        @InjectRepository(UsuarioEntity)
        private readonly repository: Repository<UsuarioEntity>
    ) {}

    async findAll(page: number, limit: number): Promise<PaginatedResult<Usuario>> {
        const [entities, total] = await this.repository.findAndCount({ skip: (page - 1) * limit, take: limit });
        return { data: entities.map(UsuarioMapper.toDomain), total, page, limit };
    }

    async findById(id: string): Promise<Usuario | null> {
        const entity = await this.repository.findOne({ where: { id: id as any } });
        return entity ? UsuarioMapper.toDomain(entity) : null;
    }

    async save(domain: Usuario): Promise<Usuario> {
        let entity = UsuarioMapper.toEntity(domain);
        const saved = await this.repository.save(entity);
        return UsuarioMapper.toDomain(saved);
    }
}
