import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IRolesRepository } from '../../../../domain/ports/output/roles-repository.interface';
import { RolOrmEntity } from '../../../entities/rol.orm-entity';
import { RolMapper } from '../../../mappers/rol.mapper';
import { Rol } from '../../../../domain/entities/rol.domain.entity';

@Injectable()
export class RolesRepositoryAdapter implements IRolesRepository {
  constructor(
    @InjectRepository(RolOrmEntity)
    private readonly repository: Repository<RolOrmEntity>,
  ) {}

  async findAll(): Promise<Rol[]> {
    const rolesOrm = await this.repository.find();
    return rolesOrm.map(RolMapper.toDomain);
  }

  async findById(id: number): Promise<Rol | null> {
    const rolOrm = await this.repository.findOne({ where: { id_rol: id } });
    if (!rolOrm) return null;
    return RolMapper.toDomain(rolOrm);
  }

  async create(rolData: Omit<Rol, 'id_rol'>): Promise<Rol> {
    const ormEntity = RolMapper.toEntity(rolData);
    const saved = await this.repository.save(ormEntity);
    return RolMapper.toDomain(saved);
  }
}
