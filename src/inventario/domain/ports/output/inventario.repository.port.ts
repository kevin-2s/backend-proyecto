import { Inventario } from '../../entities/inventario.entity';

export interface PaginatedResult<T> { data: T[]; total: number; page: number; limit: number; }

export interface InventarioRepositoryPort {
    findAll(page: number, limit: number): Promise<PaginatedResult<Inventario>>;
    findById(id: string): Promise<Inventario | null>;
    save(entity: Inventario): Promise<Inventario>;
}
