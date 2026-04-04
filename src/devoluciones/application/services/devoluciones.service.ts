import { Devolucion } from '../../domain/entities/devolucion.entity';
import { FindDevolucionUseCase } from '../../domain/ports/input/find-devolucion.use-case';
import { CreateDevolucionUseCase, CreateDevolucionCommand } from '../../domain/ports/input/create-devolucion.use-case';
import { DevolucionRepositoryPort, PaginatedResult } from '../../domain/ports/output/devolucion.repository.port';
import { DevolucionNotFoundException } from '../../domain/exceptions/devolucion-not-found.exception';

export class DevolucionService implements FindDevolucionUseCase, CreateDevolucionUseCase {
    constructor(private readonly repository: DevolucionRepositoryPort) {}

    async findAll(page: number, limit: number): Promise<PaginatedResult<Devolucion>> {
        return this.repository.findAll(page, limit);
    }

    async findById(id: string): Promise<Devolucion> {
        const entity = await this.repository.findById(id);
        if (!entity) throw new DevolucionNotFoundException(id);
        return entity;
    }

    async create(command: CreateDevolucionCommand): Promise<Devolucion> {
        const newEntity = new Devolucion('', command.asignacionId, command.cantidadDevuelta, command.estadoFisico, new Date(), new Date());
        return this.repository.save(newEntity);
    }
}
