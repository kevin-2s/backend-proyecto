import { Categoria } from '../../entities/categoria.entity';
import { PaginatedResult } from '../output/categoria.repository.port';

export interface FindCategoriaUseCase {
    findAll(page: number, limit: number): Promise<PaginatedResult<Categoria>>;
    findById(id: string): Promise<Categoria>;
}
