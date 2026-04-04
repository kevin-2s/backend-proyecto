import { Notificacion } from '../../entities/notificacion.entity';
import { PaginatedResult } from '../output/notificacion.repository.port';

export interface FindNotificacionUseCase {
    findAll(page: number, limit: number): Promise<PaginatedResult<Notificacion>>;
    findById(id: string): Promise<Notificacion>;
}
