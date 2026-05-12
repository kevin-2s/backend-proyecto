import { Permiso } from '../../../domain/permiso';
import { CrearPermisoDto } from '../../../infrastructure/adapters/input/http/dtos/crear-permiso.dto';

export interface IPermisosUseCases {
  findAllGroupedByModule(): Promise<Record<string, Permiso[]>>;
  findById(id_permiso: number): Promise<Permiso>;
  create(dto: CrearPermisoDto): Promise<Permiso>;
}

export const IPermisosUseCases = Symbol('IPermisosUseCases');
