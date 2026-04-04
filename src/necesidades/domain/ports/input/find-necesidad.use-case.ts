import { Necesidad } from '../../entities/necesidad.entity';
import { PaginatedResult } from '../output/necesidad.repository.port';

export interface FindNecesidadUseCase {
    findAll(page: number, limit: number): Promise<PaginatedResult<Necesidad>>;
    findById(id: string): Promise<Necesidad>;
}
