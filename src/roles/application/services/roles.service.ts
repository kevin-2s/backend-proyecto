import { Injectable, Inject } from '@nestjs/common';
import { IRolesUseCases } from '../../domain/ports/input/roles-use-cases.interface';
import { IRolesRepository, ROLES_REPOSITORY } from '../../domain/ports/output/roles-repository.interface';
import { Rol } from '../../domain/entities/rol.domain.entity';
import { RolNotFoundException } from '../../domain/exceptions/rol-not-found.exception';

@Injectable()
export class RolesService implements IRolesUseCases {
  constructor(
    @Inject(ROLES_REPOSITORY)
    private readonly rolesRepository: IRolesRepository,
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
}
