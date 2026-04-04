import { Sitio } from '../../entities/sitio.entity';
import { PaginatedResult } from '../output/sitio.repository.port';

export interface FindSitioUseCase {
    findAll(page: number, limit: number): Promise<PaginatedResult<Sitio>>;
    findById(id: string): Promise<Sitio>;
}
