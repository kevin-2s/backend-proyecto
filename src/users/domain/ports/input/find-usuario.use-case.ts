import { Usuario } from '../../entities/usuario.entity';
import { PaginatedResult } from '../output/usuario.repository.port';

export interface FindUsuarioUseCase {
    findAll(page: number, limit: number): Promise<PaginatedResult<Usuario>>;
    findById(id: string): Promise<Usuario>;
}
