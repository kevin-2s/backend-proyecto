import { Categoria } from '../../entities/categoria.entity';

export interface PaginatedResult<T> { data: T[]; total: number; page: number; limit: number; }

export interface CategoriaRepositoryPort {
    findAll(page: number, limit: number): Promise<PaginatedResult<Categoria>>;
    findById(id: string): Promise<Categoria | null>;
    save(entity: Categoria): Promise<Categoria>;
}
