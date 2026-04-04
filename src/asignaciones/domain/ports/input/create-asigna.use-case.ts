import { Asigna } from '../../entities/asigna.entity';

export interface CreateAsignaCommand {
    solicitudId: string;
    inventarioId: string;
    cantidad: number;
}

export interface CreateAsignaUseCase {
    create(command: CreateAsignaCommand): Promise<Asigna>;
}
