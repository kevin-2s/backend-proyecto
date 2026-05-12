import { Inventario } from '../../entities/inventario.domain.entity';

export const INVENTARIO_REPOSITORY = Symbol('INVENTARIO_REPOSITORY');

export interface IInventarioRepository {
  findAll(): Promise<Inventario[]>;
  findById(id: number): Promise<Inventario | null>;
  create(inventario: Omit<Inventario, 'id_inventario' | 'item' | 'sitio'>): Promise<Inventario>;
}
