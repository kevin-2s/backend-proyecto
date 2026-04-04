import { Producto } from '../../entities/producto.entity';

export interface PaginatedResult<T> { data: T[]; total: number; page: number; limit: number; }

export interface ProductoRepositoryPort {
    findAll(page: number, limit: number): Promise<PaginatedResult<Producto>>;
    findById(id: string): Promise<Producto | null>;
    save(entity: Producto): Promise<Producto>;
}
