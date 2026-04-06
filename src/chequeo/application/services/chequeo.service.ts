import { Chequeo } from '../../domain/entities/chequeo.entity';
import { FindChequeoUseCase } from '../../domain/ports/input/find-chequeo.use-case';
import { CreateChequeoUseCase, CreateChequeoCommand } from '../../domain/ports/input/create-chequeo.use-case';
import { ChequeoRepositoryPort, PaginatedResult } from '../../domain/ports/output/chequeo.repository.port';
import { ChequeoNotFoundException } from '../../domain/exceptions/chequeo-not-found.exception';

export class ChequeoService implements FindChequeoUseCase, CreateChequeoUseCase {
    constructor(private readonly repository: ChequeoRepositoryPort) {}

    async findAll(page: number, limit: number): Promise<PaginatedResult<Chequeo>> {
        return this.repository.findAll(page, limit);
    }

    async findById(id: string): Promise<Chequeo> {
        const entity = await this.repository.findById(id);
        if (!entity) throw new ChequeoNotFoundException(id);
        return entity;
    }

    async create(command: CreateChequeoCommand): Promise<Chequeo> {
        const newEntity = new Chequeo(0, new Date(command.fechaChequeo), command.confirmado, command.asignaId || 0, command.devolucionId || 0, command.usuarioId);
        return this.repository.save(newEntity);
    }
}
