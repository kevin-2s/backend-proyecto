import { Solicitud } from '../../domain/entities/solicitud.entity';
import { FindSolicitudUseCase } from '../../domain/ports/input/find-solicitud.use-case';
import { CreateSolicitudUseCase, CreateSolicitudCommand } from '../../domain/ports/input/create-solicitud.use-case';
import { SolicitudRepositoryPort, PaginatedResult } from '../../domain/ports/output/solicitud.repository.port';
import { SolicitudNotFoundException } from '../../domain/exceptions/solicitud-not-found.exception';

export class SolicitudService implements FindSolicitudUseCase, CreateSolicitudUseCase {
    constructor(private readonly repository: SolicitudRepositoryPort) {}

    async findAll(page: number, limit: number): Promise<PaginatedResult<Solicitud>> {
        return this.repository.findAll(page, limit);
    }

    async findById(id: string): Promise<Solicitud> {
        const entity = await this.repository.findById(id);
        if (!entity) throw new SolicitudNotFoundException(id);
        return entity;
    }

  async create(command: CreateSolicitudCommand): Promise<Solicitud> {
    const newEntity = new Solicitud(
      0,
      new Date(),
      null,
      'PENDIENTE',
      command.justificacion,
      '',
      command.usuarioId,
      null
    );
    return this.repository.save(newEntity);
  }
}
