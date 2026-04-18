import { Movimiento } from '../../entities/movimiento.domain.entity';

export const MOVIMIENTOS_REPOSITORY = Symbol('MOVIMIENTOS_REPOSITORY');

export interface IMovimientosRepository {
  findAll(): Promise<Movimiento[]>;
  findById(id: number): Promise<Movimiento | null>;
  create(movimiento: Omit<Movimiento, 'id_movimiento' | 'item' | 'tipoMovimiento' | 'usuario'>): Promise<Movimiento>;
}
