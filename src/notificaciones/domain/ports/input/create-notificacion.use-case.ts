import { Notificacion } from '../../entities/notificacion.entity';

export interface CreateNotificacionCommand {
    usuarioId: string;
    mensaje: string;
    leida: boolean;
}

export interface CreateNotificacionUseCase {
    create(command: CreateNotificacionCommand): Promise<Notificacion>;
}
