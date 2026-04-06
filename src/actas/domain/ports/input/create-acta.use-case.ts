import { Acta } from '../../entities/acta.entity';

export interface CreateActaCommand {
    urlPdf?: string;
    asignaId?: number;
    devolucionId?: number;
}

export interface CreateActaUseCase {
    create(command: CreateActaCommand): Promise<Acta>;
}
