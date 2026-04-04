import { Sitio } from '../../entities/sitio.entity';

export interface PaginatedResult<T> { data: T[]; total: number; page: number; limit: number; }

export interface SitioRepositoryPort {
    findAll(page: number, limit: number): Promise<PaginatedResult<Sitio>>;
    findById(id: string): Promise<Sitio | null>;
    save(entity: Sitio): Promise<Sitio>;
}
