import { Necesidad } from '../../entities/necesidad.entity';

export interface CreateNecesidadCommand {
    cantidadN: number;
    fechaLimite?: string;
    usuarioId: number;
    productoId: number;
    fichaId: number;
}

export interface CreateNecesidadUseCase {
    create(command: CreateNecesidadCommand): Promise<Necesidad>;
}
