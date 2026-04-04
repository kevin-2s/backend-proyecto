import { Devolucion } from '../../entities/devolucion.entity';
import { PaginatedResult } from '../output/devolucion.repository.port';

export interface FindDevolucionUseCase {
    findAll(page: number, limit: number): Promise<PaginatedResult<Devolucion>>;
    findById(id: string): Promise<Devolucion>;
}
