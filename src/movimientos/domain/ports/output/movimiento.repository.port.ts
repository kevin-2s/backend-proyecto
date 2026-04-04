import { Movimiento } from '../../entities/movimiento.entity';

export interface PaginatedResult<T> { data: T[]; total: number; page: number; limit: number; }

export interface MovimientoRepositoryPort {
    findAll(page: number, limit: number): Promise<PaginatedResult<Movimiento>>;
    findById(id: string): Promise<Movimiento | null>;
    save(entity: Movimiento): Promise<Movimiento>;
}
