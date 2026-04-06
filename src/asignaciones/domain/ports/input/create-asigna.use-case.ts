import { Asigna } from '../../entities/asigna.entity';

export interface CreateAsignaCommand {
    estadoFisico: string;
    estadoEntrega: string;
    fechaEnt: string;
    fechaDevolucionEst?: string;
    observaciones?: string;
    productoId: number;
    usuarioId: number;
    fichaId?: number;
}

export interface CreateAsignaUseCase {
    create(command: CreateAsignaCommand): Promise<Asigna>;
}
