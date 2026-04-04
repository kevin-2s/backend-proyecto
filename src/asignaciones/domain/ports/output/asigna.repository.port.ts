import { Asigna } from '../../entities/asigna.entity';

export interface PaginatedResult<T> { data: T[]; total: number; page: number; limit: number; }

export interface AsignaRepositoryPort {
    findAll(page: number, limit: number): Promise<PaginatedResult<Asigna>>;
    findById(id: string): Promise<Asigna | null>;
    save(entity: Asigna): Promise<Asigna>;
}
