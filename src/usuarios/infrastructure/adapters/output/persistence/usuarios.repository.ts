import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IUsuariosRepository } from '../../../../domain/ports/output/usuarios-repository.interface';
import { UsuarioOrmEntity } from '../../../entities/usuario.orm-entity';
import { UsuarioMapper } from '../../../mappers/usuario.mapper';
import { Usuario } from '../../../../domain/entities/usuario.domain.entity';

@Injectable()
export class UsuariosRepositoryAdapter implements IUsuariosRepository {
  constructor(
    @InjectRepository(UsuarioOrmEntity)
    private readonly repository: Repository<UsuarioOrmEntity>,
  ) {}

  async findAll(): Promise<Usuario[]> {
    const usuariosOrm = await this.repository.find({ relations: ['rol'] });
    return usuariosOrm.map(UsuarioMapper.toDomain);
  }

  async findById(id: number): Promise<Usuario | null> {
    const usuarioOrm = await this.repository.findOne({ where: { id_usuario: id }, relations: ['rol'] });
    if (!usuarioOrm) return null;
    return UsuarioMapper.toDomain(usuarioOrm);
  }

  async create(usuarioData: Omit<Usuario, 'id_usuario' | 'estado' | 'rol'>): Promise<Usuario> {
    const ormEntity = UsuarioMapper.toOrm({ ...usuarioData, estado: true });
    const saved = await this.repository.save(ormEntity);
    return UsuarioMapper.toDomain(saved);
  }

  async update(id: number, usuarioData: Partial<Omit<Usuario, 'id_usuario' | 'rol'>>): Promise<Usuario> {
    await this.repository.update(id, usuarioData);
    return this.findById(id) as Promise<Usuario>;
  }
}
