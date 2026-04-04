import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoleRepositoryPort, PaginatedResult } from '../../../../domain/ports/output/role.repository.port';
import { Role } from '../../../../domain/entities/role.entity';
import { RoleEntity } from '../../../entities/role.typeorm.entity';
import { RoleMapper } from '../../../mappers/role.mapper';

@Injectable()
export class RoleRepositoryAdapter implements RoleRepositoryPort {
    constructor(
        @InjectRepository(RoleEntity)
        private readonly roleRepository: Repository<RoleEntity>
    ) {}

    async findAll(page: number, limit: number): Promise<PaginatedResult<Role>> {
        const [entities, total] = await this.roleRepository.findAndCount({
            skip: (page - 1) * limit,
            take: limit,
        });

        return {
            data: entities.map(RoleMapper.toDomain),
            total,
            page,
            limit
        };
    }

    async findById(id: string): Promise<Role | null> {
        const entity = await this.roleRepository.findOne({ where: { id } });
        return entity ? RoleMapper.toDomain(entity) : null;
    }

    async save(role: Role): Promise<Role> {
        const entity = RoleMapper.toEntity(role);
        const savedEntity = await this.roleRepository.save(entity);
        return RoleMapper.toDomain(savedEntity);
    }
}
