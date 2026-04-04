import { Necesidad } from '../../domain/entities/necesidad.entity';
import { FindNecesidadUseCase } from '../../domain/ports/input/find-necesidad.use-case';
import { CreateNecesidadUseCase, CreateNecesidadCommand } from '../../domain/ports/input/create-necesidad.use-case';
import { NecesidadRepositoryPort, PaginatedResult } from '../../domain/ports/output/necesidad.repository.port';
import { NecesidadNotFoundException } from '../../domain/exceptions/necesidad-not-found.exception';

export class NecesidadService implements FindNecesidadUseCase, CreateNecesidadUseCase {
    constructor(private readonly repository: NecesidadRepositoryPort) {}

    async findAll(page: number, limit: number): Promise<PaginatedResult<Necesidad>> {
        return this.repository.findAll(page, limit);
    }

    async findById(id: string): Promise<Necesidad> {
        const entity = await this.repository.findById(id);
        if (!entity) throw new NecesidadNotFoundException(id);
        return entity;
    }

    async create(command: CreateNecesidadCommand): Promise<Necesidad> {
        const newEntity = new Necesidad('', command.productoId, command.cantidadNecesaria, command.justificacion, command.estado, new Date(), new Date());
        return this.repository.save(newEntity);
    }
}
