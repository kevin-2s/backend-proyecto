import { TipoMovimiento } from '../../entities/tipo-movimiento.domain.entity';

export const TIPOS_MOVIMIENTO_USE_CASES = Symbol('TIPOS_MOVIMIENTO_USE_CASES');

export interface ITiposMovimientoUseCases {
  obtenerTiposMovimiento(): Promise<TipoMovimiento[]>;
  crearTipoMovimiento(nombre: string): Promise<TipoMovimiento>;
}
