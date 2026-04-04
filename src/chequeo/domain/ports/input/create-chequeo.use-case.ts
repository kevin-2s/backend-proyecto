import { Chequeo } from '../../entities/chequeo.entity';

export interface CreateChequeoCommand {
    sitioId: string;
    responsableId: string;
}

export interface CreateChequeoUseCase {
    create(command: CreateChequeoCommand): Promise<Chequeo>;
}
