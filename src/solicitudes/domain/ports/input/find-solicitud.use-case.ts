import { Solicitud } from '../../entities/solicitud.entity';
import { PaginatedResult } from '../output/solicitud.repository.port';

export interface FindSolicitudUseCase {
    findAll(page: number, limit: number): Promise<PaginatedResult<Solicitud>>;
    findById(id: string): Promise<Solicitud>;
}
