import { Ficha } from '../../entities/ficha.entity';
import { PaginatedResult } from '../output/ficha.repository.port';

export interface FindFichaUseCase {
    findAll(page: number, limit: number): Promise<PaginatedResult<Ficha>>;
    findById(id: string): Promise<Ficha>;
}
