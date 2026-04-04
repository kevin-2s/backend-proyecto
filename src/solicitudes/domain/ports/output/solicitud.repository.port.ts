import { Solicitud } from '../../entities/solicitud.entity';

export interface PaginatedResult<T> { data: T[]; total: number; page: number; limit: number; }

export interface SolicitudRepositoryPort {
    findAll(page: number, limit: number): Promise<PaginatedResult<Solicitud>>;
    findById(id: string): Promise<Solicitud | null>;
    save(entity: Solicitud): Promise<Solicitud>;
}
