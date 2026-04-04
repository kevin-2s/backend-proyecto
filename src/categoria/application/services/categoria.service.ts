import { Categoria } from '../../domain/entities/categoria.entity';
import { FindCategoriaUseCase } from '../../domain/ports/input/find-categoria.use-case';
import { CreateCategoriaUseCase, CreateCategoriaCommand } from '../../domain/ports/input/create-categoria.use-case';
import { CategoriaRepositoryPort, PaginatedResult } from '../../domain/ports/output/categoria.repository.port';
import { CategoriaNotFoundException } from '../../domain/exceptions/categoria-not-found.exception';

export class CategoriaService implements FindCategoriaUseCase, CreateCategoriaUseCase {
    constructor(private readonly repository: CategoriaRepositoryPort) {}

    async findAll(page: number, limit: number): Promise<PaginatedResult<Categoria>> {
        return this.repository.findAll(page, limit);
    }

    async findById(id: string): Promise<Categoria> {
        const entity = await this.repository.findById(id);
        if (!entity) throw new CategoriaNotFoundException(id);
        return entity;
    }

    async create(command: CreateCategoriaCommand): Promise<Categoria> {
        const newEntity = new Categoria('', command.nombre, command.descripcion, new Date(), new Date());
        return this.repository.save(newEntity);
    }
}
