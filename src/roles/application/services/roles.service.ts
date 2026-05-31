import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IRolesUseCases } from '../../domain/ports/input/roles-use-cases.interface';
import { IRolesRepository, ROLES_REPOSITORY } from '../../domain/ports/output/roles-repository.interface';
import { Rol } from '../../domain/entities/rol.domain.entity';
import { RolNotFoundException } from '../../domain/exceptions/rol-not-found.exception';
import { RolPermisoOrmEntity } from '../../infrastructure/entities/rol-permiso.orm-entity';

@Injectable()
export class RolesService implements IRolesUseCases {
  constructor(
    @Inject(ROLES_REPOSITORY)
    private readonly rolesRepository: IRolesRepository,
    @InjectRepository(RolPermisoOrmEntity)
    private readonly rolPermisoRepo: Repository<RolPermisoOrmEntity>,
  ) {}

  async obtenerRoles(): Promise<Rol[]> {
    return this.rolesRepository.findAll();
  }

  async obtenerRolPorId(id: number): Promise<Rol> {
    const rol = await this.rolesRepository.findById(id);
    if (!rol) {
      throw new RolNotFoundException(id);
    }
    return rol;
  }

  async crearRol(nombre: string): Promise<Rol> {
    return this.rolesRepository.create({ nombre });
  }

  async obtenerPermisosPorRol(id: number): Promise<any> {
    const rows = await this.rolPermisoRepo.find({
      where: { id_rol: id },
      relations: ['permiso'],
    });
    return rows.map(r => ({
      id: r.id,
      id_permiso: r.id_permiso,
      nombre: r.permiso.nombre,
      descripcion: r.permiso.descripcion,
      modulo: r.permiso.modulo,
    }));
  }

  async asignarPermisos(id: number, idPermisos: number[]): Promise<void> {
    await this.rolPermisoRepo.delete({ id_rol: id });
    if (idPermisos.length > 0) {
      const rows = idPermisos.map(idPermiso => {
        const entity = new RolPermisoOrmEntity();
        entity.id_rol = id;
        entity.id_permiso = idPermiso;
        return entity;
      });
      await this.rolPermisoRepo.save(rows);
    }
  }
}