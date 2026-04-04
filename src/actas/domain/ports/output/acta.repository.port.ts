import { Acta } from '../../entities/acta.entity';

export interface PaginatedResult<T> { data: T[]; total: number; page: number; limit: number; }

export interface ActaRepositoryPort {
    findAll(page: number, limit: number): Promise<PaginatedResult<Acta>>;
    findById(id: string): Promise<Acta | null>;
    save(entity: Acta): Promise<Acta>;
}
