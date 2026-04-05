import { Chequeo } from '../../entities/chequeo.entity';

export interface CreateChequeoCommand {
    fechaChequeo: string;
    confirmado: boolean;
    asignaId?: number;
    devolucionId?: number;
    usuarioId: number;
    items?: any[];
}

export interface CreateChequeoUseCase {
    create(command: CreateChequeoCommand): Promise<Chequeo>;
}
