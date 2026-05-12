import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IUsuarioPermisosRepository } from '../../../../application/ports/output/usuario-permisos.repository.interface';
import { UsuarioPermiso } from '../../../../domain/usuario-permiso';
import { UsuarioPermisoOrmEntity } from '../../../entities/usuario-permiso.orm-entity';
import { UsuarioPermisoMapper } from '../../../mappers/usuario-permiso.mapper';

@Injectable()
export class UsuarioPermisosRepository implements IUsuarioPermisosRepository {
  constructor(
    @InjectRepository(UsuarioPermisoOrmEntity)
    private readonly repository: Repository<UsuarioPermisoOrmEntity>,
  ) {}

  async findAllByUserId(id_usuario: number): Promise<UsuarioPermiso[]> {
    const ormEntities = await this.repository.find({
      where: { id_usuario },
      relations: ['permiso'],
    });
    return ormEntities.map(UsuarioPermisoMapper.toDomain);
  }

  async findByUserIdAndPermisoId(id_usuario: number, id_permiso: number): Promise<UsuarioPermiso | null> {
    const ormEntity = await this.repository.findOne({
      where: { id_usuario, id_permiso },
      relations: ['permiso'],
    });
    return ormEntity ? UsuarioPermisoMapper.toDomain(ormEntity) : null;
  }

  async create(data: Partial<UsuarioPermiso>): Promise<UsuarioPermiso> {
    const entity = this.repository.create({
      id_usuario: data.id_usuario,
      id_permiso: data.id_permiso,
      activo: data.activo,
    });
    const saved = await this.repository.save(entity);
    const reFetched = await this.findByUserIdAndPermisoId(saved.id_usuario, saved.id_permiso);
    if(!reFetched) {
        throw new Error("No se pudo obtener la entidad despues de guardar");
    }
    return reFetched;
  }

  async update(id: number, activo: boolean): Promise<UsuarioPermiso> {
    await this.repository.update(id, { activo });
    const ormEntity = await this.repository.findOne({ where: { id }, relations: ['permiso'] });
    if (!ormEntity) {
        throw new Error('Permiso no encontrado después de actualizar');
    }
    return UsuarioPermisoMapper.toDomain(ormEntity);
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
