import { Movimiento } from '../../entities/movimiento.domain.entity';

export const MOVIMIENTOS_USE_CASES = Symbol('MOVIMIENTOS_USE_CASES');

export interface IMovimientosUseCases {
  obtenerMovimientos(): Promise<Movimiento[]>;
  obtenerMovimientoPorId(id: number): Promise<Movimiento>;
  crearMovimiento(data: { fecha: Date; observacion: string | null; id_item: number; id_tipo_movimiento: number; id_usuario: number; cantidad: number }): Promise<Movimiento>;
}
