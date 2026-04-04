import { Movimiento } from '../../entities/movimiento.entity';
import { PaginatedResult } from '../output/movimiento.repository.port';

export interface FindMovimientoUseCase {
    findAll(page: number, limit: number): Promise<PaginatedResult<Movimiento>>;
    findById(id: string): Promise<Movimiento>;
}
