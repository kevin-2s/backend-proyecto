import { Producto } from '../../entities/producto.entity';
import { PaginatedResult } from '../output/producto.repository.port';

export interface FindProductoUseCase {
    findAll(page: number, limit: number): Promise<PaginatedResult<Producto>>;
    findById(id: string): Promise<Producto>;
}
