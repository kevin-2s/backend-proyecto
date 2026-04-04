import { Asigna } from '../../domain/entities/asigna.entity';
import { FindAsignaUseCase } from '../../domain/ports/input/find-asigna.use-case';
import { CreateAsignaUseCase, CreateAsignaCommand } from '../../domain/ports/input/create-asigna.use-case';
import { AsignaRepositoryPort, PaginatedResult } from '../../domain/ports/output/asigna.repository.port';
import { AsignaNotFoundException } from '../../domain/exceptions/asigna-not-found.exception';

export class AsignaService implements FindAsignaUseCase, CreateAsignaUseCase {
    constructor(private readonly repository: AsignaRepositoryPort) {}

    async findAll(page: number, limit: number): Promise<PaginatedResult<Asigna>> {
        return this.repository.findAll(page, limit);
    }

    async findById(id: string): Promise<Asigna> {
        const entity = await this.repository.findById(id);
        if (!entity) throw new AsignaNotFoundException(id);
        return entity;
    }

    async create(command: CreateAsignaCommand): Promise<Asigna> {
        const newEntity = new Asigna('', command.solicitudId, command.inventarioId, command.cantidad, new Date(), new Date());
        return this.repository.save(newEntity);
    }
}
