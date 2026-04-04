import { Necesidad } from '../../entities/necesidad.entity';

export interface PaginatedResult<T> { data: T[]; total: number; page: number; limit: number; }

export interface NecesidadRepositoryPort {
    findAll(page: number, limit: number): Promise<PaginatedResult<Necesidad>>;
    findById(id: string): Promise<Necesidad | null>;
    save(entity: Necesidad): Promise<Necesidad>;
}
