import { Inject, Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { IPermisosUseCases } from '../../application/ports/input/permisos.use-cases.interface';
import { IPermisosRepository } from '../../application/ports/output/permisos.repository.interface';
import { Permiso } from '../../domain/permiso';
import { CrearPermisoDto } from '../../infrastructure/adapters/input/http/dtos/crear-permiso.dto';

@Injectable()
export class PermisosService implements IPermisosUseCases {
  constructor(
    @Inject(IPermisosRepository)
    private readonly permisosRepository: IPermisosRepository,
  ) {}

  async findAllGroupedByModule(): Promise<Record<string, Permiso[]>> {
    const permisos = await this.permisosRepository.findAll();
    
    // Group by module
    const grouped = permisos.reduce((acc, permiso) => {
      const moduleName = permiso.modulo;
      if (!acc[moduleName]) {
        acc[moduleName] = [];
      }
      acc[moduleName].push(permiso);
      return acc;
    }, {} as Record<string, Permiso[]>);
    
    return grouped;
  }

  async findById(id_permiso: number): Promise<Permiso> {
    const permiso = await this.permisosRepository.findById(id_permiso);
    if (!permiso) {
      throw new NotFoundException(`Permiso con ID ${id_permiso} no encontrado`);
    }
    return permiso;
  }

  async create(dto: CrearPermisoDto): Promise<Permiso> {
    const existing = await this.permisosRepository.findByNombre(dto.nombre);
    if (existing) {
      throw new BadRequestException(`El permiso con nombre '${dto.nombre}' ya existe`);
    }

    return this.permisosRepository.create({
      nombre: dto.nombre,
      descripcion: dto.descripcion,
      modulo: dto.modulo,
      activo: true,
    });
  }
}
