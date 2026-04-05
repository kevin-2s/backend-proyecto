import { Notificacion } from '../../domain/entities/notificacion.entity';
import { FindNotificacionUseCase } from '../../domain/ports/input/find-notificacion.use-case';
import { CreateNotificacionUseCase, CreateNotificacionCommand } from '../../domain/ports/input/create-notificacion.use-case';
import { NotificacionRepositoryPort, PaginatedResult } from '../../domain/ports/output/notificacion.repository.port';
import { NotificacionNotFoundException } from '../../domain/exceptions/notificacion-not-found.exception';

export class NotificacionService implements FindNotificacionUseCase, CreateNotificacionUseCase {
    constructor(private readonly repository: NotificacionRepositoryPort) {}

    async findAll(page: number, limit: number): Promise<PaginatedResult<Notificacion>> {
        return this.repository.findAll(page, limit);
    }

    async findById(id: string): Promise<Notificacion> {
        const entity = await this.repository.findById(id);
        if (!entity) throw new NotificacionNotFoundException(id);
        return entity;
    }

    async create(command: CreateNotificacionCommand): Promise<Notificacion> {
        const newEntity = new Notificacion(0, command.mensaje, command.leida || false, new Date(), command.tipoEvento, command.usuarioId);
        return this.repository.save(newEntity);
    }
}
