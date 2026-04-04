import { Devolucion } from '../../entities/devolucion.entity';

export interface CreateDevolucionCommand {
    asignacionId: string;
    cantidadDevuelta: number;
    estadoFisico: string;
}

export interface CreateDevolucionUseCase {
    create(command: CreateDevolucionCommand): Promise<Devolucion>;
}
