import { Movimiento } from '../../domain/entities/movimiento.entity';
import { FindMovimientoUseCase } from '../../domain/ports/input/find-movimiento.use-case';
import { CreateMovimientoUseCase, CreateMovimientoCommand } from '../../domain/ports/input/create-movimiento.use-case';
import { MovimientoRepositoryPort, PaginatedResult } from '../../domain/ports/output/movimiento.repository.port';
import { MovimientoNotFoundException } from '../../domain/exceptions/movimiento-not-found.exception';

export class MovimientoService implements FindMovimientoUseCase, CreateMovimientoUseCase {
    constructor(private readonly repository: MovimientoRepositoryPort) {}

    async findAll(page: number, limit: number): Promise<PaginatedResult<Movimiento>> {
        return this.repository.findAll(page, limit);
    }

    async findById(id: string): Promise<Movimiento> {
        const entity = await this.repository.findById(id);
        if (!entity) throw new MovimientoNotFoundException(id);
        return entity;
    }

    async create(command: CreateMovimientoCommand): Promise<Movimiento> {
        const newEntity = new Movimiento('', command.tipoMovimiento, command.productoId, command.cantidad, command.sitioOrigenId, command.sitioDestinoId, command.usuarioId, new Date(), new Date());
        return this.repository.save(newEntity);
    }
}
