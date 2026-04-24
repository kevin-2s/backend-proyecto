import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IPermisosRepository } from '../../../../application/ports/output/permisos.repository.interface';
import { Permiso } from '../../../../domain/permiso';
import { PermisoOrmEntity } from '../../../entities/permiso.orm-entity';
import { PermisoMapper } from '../../../mappers/permiso.mapper';

@Injectable()
export class PermisosRepository implements IPermisosRepository {
  constructor(
    @InjectRepository(PermisoOrmEntity)
    private readonly repository: Repository<PermisoOrmEntity>,
  ) {}

  async findAll(): Promise<Permiso[]> {
    const entities = await this.repository.find();
    return entities.map(PermisoMapper.toDomain);
  }

  async findById(id_permiso: number): Promise<Permiso | null> {
    const entity = await this.repository.findOne({ where: { id_permiso } });
    return entity ? PermisoMapper.toDomain(entity) : null;
  }

  async findByNombre(nombre: string): Promise<Permiso | null> {
    const entity = await this.repository.findOne({ where: { nombre } });
    return entity ? PermisoMapper.toDomain(entity) : null;
  }

  async create(permiso: Partial<Permiso>): Promise<Permiso> {
    const entity = this.repository.create(permiso);
    const saved = await this.repository.save(entity);
    return PermisoMapper.toDomain(saved);
  }
}
