import { TipoMovimiento } from '../../entities/tipo-movimiento.domain.entity';

export const TIPOS_MOVIMIENTO_REPOSITORY = Symbol('TIPOS_MOVIMIENTO_REPOSITORY');

export interface ITiposMovimientoRepository {
  findAll(): Promise<TipoMovimiento[]>;
  create(tipoMovimiento: Omit<TipoMovimiento, 'id_tipo_movimiento'>): Promise<TipoMovimiento>;
}
