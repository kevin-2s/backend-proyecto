import { Notificacion } from '../../entities/notificacion.entity';

export interface CreateNotificacionCommand {
    mensaje: string;
    leida?: boolean;
    tipoEvento: string;
    usuarioId: number;
}

export interface CreateNotificacionUseCase {
    create(command: CreateNotificacionCommand): Promise<Notificacion>;
}
