import { Inventario } from '../../entities/inventario.entity';
import { PaginatedResult } from '../output/inventario.repository.port';

export interface FindInventarioUseCase {
    findAll(page: number, limit: number): Promise<PaginatedResult<Inventario>>;
    findById(id: string): Promise<Inventario>;
}
