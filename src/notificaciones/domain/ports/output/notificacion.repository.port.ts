import { Notificacion } from '../../entities/notificacion.entity';

export interface PaginatedResult<T> { data: T[]; total: number; page: number; limit: number; }

export interface NotificacionRepositoryPort {
    findAll(page: number, limit: number): Promise<PaginatedResult<Notificacion>>;
    findById(id: string): Promise<Notificacion | null>;
    save(entity: Notificacion): Promise<Notificacion>;
}
