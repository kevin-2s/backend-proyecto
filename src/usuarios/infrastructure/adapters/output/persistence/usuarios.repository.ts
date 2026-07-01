import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IUsuariosRepository } from '../../../../domain/ports/output/usuarios-repository.interface';
import { UsuarioOrmEntity } from '../../../entities/usuario.orm-entity';
import { UsuarioMapper } from '../../../mappers/usuario.mapper';
import { Usuario } from '../../../../domain/entities/usuario.domain.entity';
import { TenancyService } from '../../../../../shared/tenancy/tenancy.service';

@Injectable()
export class UsuariosRepositoryAdapter implements IUsuariosRepository {
  constructor(
    @InjectRepository(UsuarioOrmEntity)
    private readonly repository: Repository<UsuarioOrmEntity>,
    private readonly tenancyService: TenancyService,
  ) {}

  async findAll(): Promise<Usuario[]> {
    const tenantId = this.tenancyService.getTenantId();
    const usuariosOrm = await this.repository.find({
      where: tenantId === 'GLOBAL' ? {} : { tenant_id: tenantId },
      relations: ['rol'],
      select: {
        id_usuario: true,
        nombre: true,
        correo: true,
        telefono: true,
        documento: true,
        estado: true,
        id_rol: true,
        rol: {
          id_rol: true,
          nombre: true,
        },
      },
    });
    return usuariosOrm.map(UsuarioMapper.toDomain);
  }

  async findById(id: number): Promise<Usuario | null> {
    const tenantId = this.tenancyService.getTenantId();
    const usuarioOrm = await this.repository.findOne({
      where: tenantId === 'GLOBAL' ? { id_usuario: id } : { id_usuario: id, tenant_id: tenantId },
      relations: ['rol'],
      select: {
        id_usuario: true,
        nombre: true,
        correo: true,
        telefono: true,
        documento: true,
        estado: true,
        tenant_id: true,
        id_rol: true,
        rol: {
          id_rol: true,
          nombre: true,
        },
      },
    });
    if (!usuarioOrm) return null;
    return UsuarioMapper.toDomain(usuarioOrm);
  }

  async create(usuarioData: Omit<Usuario, 'id_usuario' | 'estado' | 'rol' | 'setPassword' | 'getPassword'> & { password?: string }): Promise<Usuario> {
    const tenantId = this.tenancyService.getTenantId();
    const ormEntity = UsuarioMapper.toEntity({ ...usuarioData, estado: true } as any);
    ormEntity.tenant_id = tenantId === 'GLOBAL' ? (usuarioData as any).tenant_id || 'default' : tenantId;
    const saved = await this.repository.save(ormEntity);
    return UsuarioMapper.toDomain(saved);
  }

  async update(id: number, usuarioData: Partial<Omit<Usuario, 'id_usuario' | 'rol' | 'setPassword' | 'getPassword'> & { password?: string }>): Promise<Usuario> {
    const tenantId = this.tenancyService.getTenantId();
    const whereClause = tenantId === 'GLOBAL' ? { id_usuario: id } : { id_usuario: id, tenant_id: tenantId };
    const updateData = tenantId === 'GLOBAL' ? { ...usuarioData } : { ...usuarioData, tenant_id: tenantId };
    await this.repository.update(whereClause, updateData as any);
    return this.findById(id) as Promise<Usuario>;
  }

  async delete(id: number): Promise<void> {
    const tenantId = this.tenancyService.getTenantId();
    const whereClause = tenantId === 'GLOBAL' ? { id_usuario: id } : { id_usuario: id, tenant_id: tenantId };
    await this.repository.delete(whereClause);
  }
}
