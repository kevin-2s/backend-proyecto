import { Movimiento } from '../../entities/movimiento.entity';

export interface CreateMovimientoCommand {
    tipo: import('../../../../shared/domain/enums').TipoMovimiento;
    cantidad: number;
    observaciones?: string;
    productoId: number;
    usuarioId: number;
    sitioId: number;
}

export interface CreateMovimientoUseCase {
    create(command: CreateMovimientoCommand): Promise<Movimiento>;
}
