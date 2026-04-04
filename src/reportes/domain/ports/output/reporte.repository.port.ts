import { Reporte } from '../../entities/reporte.entity';

export interface PaginatedResult<T> { data: T[]; total: number; page: number; limit: number; }

export interface ReporteRepositoryPort {
    findAll(page: number, limit: number): Promise<PaginatedResult<Reporte>>;
    findById(id: string): Promise<Reporte | null>;
    save(entity: Reporte): Promise<Reporte>;
}
