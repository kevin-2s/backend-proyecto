import { Solicitud } from '../../entities/solicitud.entity';

export interface CreateSolicitudCommand {
    usuarioId: string;
    estado: string;
}

export interface CreateSolicitudUseCase {
    create(command: CreateSolicitudCommand): Promise<Solicitud>;
}
