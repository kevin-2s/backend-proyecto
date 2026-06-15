import { Inventario } from '../../entities/inventario.domain.entity';

export const INVENTARIO_REPOSITORY = Symbol('INVENTARIO_REPOSITORY');

export interface IInventarioRepository {
  findAll(): Promise<Inventario[]>;
  findById(id: number): Promise<Inventario | null>;
  findByProducto(id_producto: number): Promise<Inventario[]>;
  countStockByProducto(id_producto: number): Promise<{ disponibles: number; total: number }>;
  create(inventario: Omit<Inventario, 'id_inventario' | 'item' | 'sitio'>): Promise<Inventario>;
  update(id: number, inventario: Partial<Inventario>): Promise<Inventario>;
  delete(id: number): Promise<void>;
}
