import { Movimiento } from '../../entities/movimiento.entity';

export interface CreateMovimientoCommand {
    tipoMovimiento: string;
    productoId: string;
    cantidad: number;
    sitioOrigenId: string;
    sitioDestinoId: string;
    usuarioId: string;
}

export interface CreateMovimientoUseCase {
    create(command: CreateMovimientoCommand): Promise<Movimiento>;
}
