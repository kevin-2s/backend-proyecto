import { Solicitud } from '../../entities/solicitud.entity';

export interface CreateSolicitudCommand {
    justificacion: string;
    usuarioId: number;
}

export interface CreateSolicitudUseCase {
    create(command: CreateSolicitudCommand): Promise<Solicitud>;
}
