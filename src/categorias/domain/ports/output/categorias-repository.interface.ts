import { Categoria } from '../../entities/categoria.domain.entity';

export const CATEGORIAS_REPOSITORY = Symbol('CATEGORIAS_REPOSITORY');

export interface ICategoriasRepository {
  findAll(): Promise<Categoria[]>;
  findById(id: number): Promise<Categoria | null>;
  create(categoria: Omit<Categoria, 'id_categoria'>): Promise<Categoria>;
}
