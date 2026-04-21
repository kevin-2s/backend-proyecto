import { Producto } from '../../entities/producto.domain.entity';

export const PRODUCTOS_REPOSITORY = Symbol('PRODUCTOS_REPOSITORY');

export interface IProductosRepository {
  findAll(): Promise<Producto[]>;
  findById(id: number): Promise<Producto | null>;
  create(producto: Omit<Producto, 'id_producto' | 'categoria'>): Promise<Producto>;
  update(id: number, producto: Partial<Omit<Producto, 'id_producto' | 'categoria'>>): Promise<Producto>;
  delete(id: number): Promise<void>;
}
