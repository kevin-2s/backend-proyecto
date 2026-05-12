import { Rol } from '../../entities/rol.domain.entity';

export const ROLES_REPOSITORY = Symbol('ROLES_REPOSITORY');

export interface IRolesRepository {
  findAll(): Promise<Rol[]>;
  findById(id: number): Promise<Rol | null>;
  create(rol: Omit<Rol, 'id_rol'>): Promise<Rol>;
}
