import { Devolucion } from '../../entities/devolucion.entity';

export interface CreateDevolucionCommand {
    estadoFisico: string;
    fechaReal: string;
    observaciones?: string;
    asignaId: number;
    productoId: number;
    movimientoId: number;
}

export interface CreateDevolucionUseCase {
    create(command: CreateDevolucionCommand): Promise<Devolucion>;
}
