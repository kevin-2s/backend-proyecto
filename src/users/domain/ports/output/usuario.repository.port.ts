import { Usuario } from '../../entities/usuario.entity';

export interface PaginatedResult<T> { data: T[]; total: number; page: number; limit: number; }

export interface UsuarioRepositoryPort {
    findAll(page: number, limit: number): Promise<PaginatedResult<Usuario>>;
    findById(id: string): Promise<Usuario | null>;
    save(entity: Usuario): Promise<Usuario>;
}
