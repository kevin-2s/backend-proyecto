import { Categoria } from '../../entities/categoria.domain.entity';

export const CATEGORIAS_USE_CASES = Symbol('CATEGORIAS_USE_CASES');

export interface ICategoriasUseCases {
  obtenerCategorias(): Promise<Categoria[]>;
  obtenerCategoriaPorId(id: number): Promise<Categoria>;
  crearCategoria(nombre: string): Promise<Categoria>;
}
