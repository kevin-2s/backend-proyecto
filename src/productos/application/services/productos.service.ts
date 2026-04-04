import { Producto } from '../../domain/entities/producto.entity';
import { FindProductoUseCase } from '../../domain/ports/input/find-producto.use-case';
import { CreateProductoUseCase, CreateProductoCommand } from '../../domain/ports/input/create-producto.use-case';
import { ProductoRepositoryPort, PaginatedResult } from '../../domain/ports/output/producto.repository.port';
import { ProductoNotFoundException } from '../../domain/exceptions/producto-not-found.exception';

export class ProductoService implements FindProductoUseCase, CreateProductoUseCase {
    constructor(private readonly repository: ProductoRepositoryPort) {}

    async findAll(page: number, limit: number): Promise<PaginatedResult<Producto>> {
        return this.repository.findAll(page, limit);
    }

    async findById(id: string): Promise<Producto> {
        const entity = await this.repository.findById(id);
        if (!entity) throw new ProductoNotFoundException(id);
        return entity;
    }

    async create(command: CreateProductoCommand): Promise<Producto> {
        const newEntity = new Producto('', command.nombre, command.descripcion, command.categoriaId, command.stockMinimo, new Date(), new Date());
        return this.repository.save(newEntity);
    }
}
