import { Devolucion } from '../../entities/devolucion.entity';

export interface PaginatedResult<T> { data: T[]; total: number; page: number; limit: number; }

export interface DevolucionRepositoryPort {
    findAll(page: number, limit: number): Promise<PaginatedResult<Devolucion>>;
    findById(id: string): Promise<Devolucion | null>;
    save(entity: Devolucion): Promise<Devolucion>;
}
