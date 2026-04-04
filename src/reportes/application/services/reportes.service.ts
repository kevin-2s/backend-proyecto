import { Reporte } from '../../domain/entities/reporte.entity';
import { FindReporteUseCase } from '../../domain/ports/input/find-reporte.use-case';
import { CreateReporteUseCase, CreateReporteCommand } from '../../domain/ports/input/create-reporte.use-case';
import { ReporteRepositoryPort, PaginatedResult } from '../../domain/ports/output/reporte.repository.port';
import { ReporteNotFoundException } from '../../domain/exceptions/reporte-not-found.exception';

export class ReporteService implements FindReporteUseCase, CreateReporteUseCase {
    constructor(private readonly repository: ReporteRepositoryPort) {}

    async findAll(page: number, limit: number): Promise<PaginatedResult<Reporte>> {
        return this.repository.findAll(page, limit);
    }

    async findById(id: string): Promise<Reporte> {
        const entity = await this.repository.findById(id);
        if (!entity) throw new ReporteNotFoundException(id);
        return entity;
    }

    async create(command: CreateReporteCommand): Promise<Reporte> {
        const newEntity = new Reporte('', command.tipoReporte, command.parametros, command.urlGenerado, new Date(), new Date());
        return this.repository.save(newEntity);
    }
}
