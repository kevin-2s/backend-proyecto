import { Rol } from '../../entities/rol.domain.entity';

export const ROLES_USE_CASES = Symbol('ROLES_USE_CASES');

export interface IRolesUseCases {
  obtenerRoles(): Promise<Rol[]>;
  obtenerRolPorId(id: number): Promise<Rol>;
  crearRol(nombre: string): Promise<Rol>;
}
