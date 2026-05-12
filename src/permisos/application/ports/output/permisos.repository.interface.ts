import { Permiso } from '../../../domain/permiso';

export interface IPermisosRepository {
  findAll(): Promise<Permiso[]>;
  findById(id_permiso: number): Promise<Permiso | null>;
  findByNombre(nombre: string): Promise<Permiso | null>;
  create(permiso: Partial<Permiso>): Promise<Permiso>;
}

export const IPermisosRepository = Symbol('IPermisosRepository');
