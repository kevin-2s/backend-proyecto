import { Sitio } from '../../domain/entities/sitio.entity';
import { FindSitioUseCase } from '../../domain/ports/input/find-sitio.use-case';
import { CreateSitioUseCase, CreateSitioCommand } from '../../domain/ports/input/create-sitio.use-case';
import { SitioRepositoryPort, PaginatedResult } from '../../domain/ports/output/sitio.repository.port';
import { SitioNotFoundException } from '../../domain/exceptions/sitio-not-found.exception';

export class SitioService implements FindSitioUseCase, CreateSitioUseCase {
    constructor(private readonly repository: SitioRepositoryPort) {}

    async findAll(page: number, limit: number): Promise<PaginatedResult<Sitio>> {
        return this.repository.findAll(page, limit);
    }

    async findById(id: string): Promise<Sitio> {
        const entity = await this.repository.findById(id);
        if (!entity) throw new SitioNotFoundException(id);
        return entity;
    }

    async create(command: CreateSitioCommand): Promise<Sitio> {
        const newEntity = new Sitio('', command.nombre, command.tipoSitio, command.capacidad, new Date(), new Date());
        return this.repository.save(newEntity);
    }
}
