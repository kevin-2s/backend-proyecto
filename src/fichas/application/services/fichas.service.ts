import { Ficha } from '../../domain/entities/ficha.entity';
import { FindFichaUseCase } from '../../domain/ports/input/find-ficha.use-case';
import { CreateFichaUseCase, CreateFichaCommand } from '../../domain/ports/input/create-ficha.use-case';
import { FichaRepositoryPort, PaginatedResult } from '../../domain/ports/output/ficha.repository.port';
import { FichaNotFoundException } from '../../domain/exceptions/ficha-not-found.exception';

export class FichaService implements FindFichaUseCase, CreateFichaUseCase {
    constructor(private readonly repository: FichaRepositoryPort) {}

    async findAll(page: number, limit: number): Promise<PaginatedResult<Ficha>> {
        return this.repository.findAll(page, limit);
    }

    async findById(id: string): Promise<Ficha> {
        const entity = await this.repository.findById(id);
        if (!entity) throw new FichaNotFoundException(id);
        return entity;
    }

    async create(command: CreateFichaCommand): Promise<Ficha> {
        const newEntity = new Ficha('', command.codigo, command.programa, command.estado, new Date(), new Date());
        return this.repository.save(newEntity);
    }
}
