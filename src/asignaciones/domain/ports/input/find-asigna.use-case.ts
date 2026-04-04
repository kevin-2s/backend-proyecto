import { Asigna } from '../../entities/asigna.entity';
import { PaginatedResult } from '../output/asigna.repository.port';

export interface FindAsignaUseCase {
    findAll(page: number, limit: number): Promise<PaginatedResult<Asigna>>;
    findById(id: string): Promise<Asigna>;
}
