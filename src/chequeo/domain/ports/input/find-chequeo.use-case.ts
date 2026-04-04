import { Chequeo } from '../../entities/chequeo.entity';
import { PaginatedResult } from '../output/chequeo.repository.port';

export interface FindChequeoUseCase {
    findAll(page: number, limit: number): Promise<PaginatedResult<Chequeo>>;
    findById(id: string): Promise<Chequeo>;
}
