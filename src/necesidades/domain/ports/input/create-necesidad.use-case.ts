import { Necesidad } from '../../entities/necesidad.entity';

export interface CreateNecesidadCommand {
    productoId: string;
    cantidadNecesaria: number;
    justificacion: string;
    estado: string;
}

export interface CreateNecesidadUseCase {
    create(command: CreateNecesidadCommand): Promise<Necesidad>;
}
