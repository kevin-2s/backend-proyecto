import { Acta } from '../../entities/acta.entity';

export interface CreateActaCommand {
    movimientoId: string;
    tipoActa: string;
    urlPdf: string;
    generadoPor: string;
}

export interface CreateActaUseCase {
    create(command: CreateActaCommand): Promise<Acta>;
}
