import { Chequeo } from '../../entities/chequeo.entity';

export interface PaginatedResult<T> { data: T[]; total: number; page: number; limit: number; }

export interface ChequeoRepositoryPort {
    findAll(page: number, limit: number): Promise<PaginatedResult<Chequeo>>;
    findById(id: string): Promise<Chequeo | null>;
    save(entity: Chequeo): Promise<Chequeo>;
}
