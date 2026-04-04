import { Reporte } from '../../entities/reporte.entity';
import { PaginatedResult } from '../output/reporte.repository.port';

export interface FindReporteUseCase {
    findAll(page: number, limit: number): Promise<PaginatedResult<Reporte>>;
    findById(id: string): Promise<Reporte>;
}
