import { Inventario } from '../../domain/entities/inventario.entity';
import { FindInventarioUseCase } from '../../domain/ports/input/find-inventario.use-case';
import { CreateInventarioUseCase, CreateInventarioCommand } from '../../domain/ports/input/create-inventario.use-case';
import { InventarioRepositoryPort, PaginatedResult } from '../../domain/ports/output/inventario.repository.port';
import { InventarioNotFoundException } from '../../domain/exceptions/inventario-not-found.exception';

export class InventarioService implements FindInventarioUseCase, CreateInventarioUseCase {
    constructor(private readonly repository: InventarioRepositoryPort) {}

    async findAll(page: number, limit: number): Promise<PaginatedResult<Inventario>> {
        return this.repository.findAll(page, limit);
    }

    async findById(id: string): Promise<Inventario> {
        const entity = await this.repository.findById(id);
        if (!entity) throw new InventarioNotFoundException(id);
        return entity;
    }

    async create(command: CreateInventarioCommand): Promise<Inventario> {
        const newEntity = new Inventario('', command.productoId, command.sitioId, command.cantidad, new Date(), new Date());
        // TODO: Integración con BullMQ para alerta de bajo stock
        return this.repository.save(newEntity);
    }
}
