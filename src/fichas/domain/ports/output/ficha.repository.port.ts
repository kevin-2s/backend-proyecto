import { Ficha } from '../../entities/ficha.entity';

export interface PaginatedResult<T> { data: T[]; total: number; page: number; limit: number; }

export interface FichaRepositoryPort {
    findAll(page: number, limit: number): Promise<PaginatedResult<Ficha>>;
    findById(id: string): Promise<Ficha | null>;
    save(entity: Ficha): Promise<Ficha>;
}
