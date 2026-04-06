import { Acta } from '../../domain/entities/acta.entity';
import { FindActaUseCase } from '../../domain/ports/input/find-acta.use-case';
import { CreateActaUseCase, CreateActaCommand } from '../../domain/ports/input/create-acta.use-case';
import { ActaRepositoryPort, PaginatedResult } from '../../domain/ports/output/acta.repository.port';
import { ActaNotFoundException } from '../../domain/exceptions/acta-not-found.exception';

export class ActaService implements FindActaUseCase, CreateActaUseCase {
    constructor(private readonly repository: ActaRepositoryPort) {}

    async findAll(page: number, limit: number): Promise<PaginatedResult<Acta>> {
        return this.repository.findAll(page, limit);
    }

    async findById(id: string): Promise<Acta> {
        const entity = await this.repository.findById(id);
        if (!entity) throw new ActaNotFoundException(id);
        return entity;
    }

    async create(command: CreateActaCommand): Promise<Acta> {
        const newEntity = new Acta(0, new Date(), command.urlPdf || '', command.asignaId || 0, command.devolucionId || 0);
        // TODO: Generación de Acta PDF via PDFKit
        return this.repository.save(newEntity);
    }
}
