import { Acta } from '../../entities/acta.entity';
import { PaginatedResult } from '../output/acta.repository.port';

export interface FindActaUseCase {
    findAll(page: number, limit: number): Promise<PaginatedResult<Acta>>;
    findById(id: string): Promise<Acta>;
}
