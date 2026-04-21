import { Inventario } from '../../entities/inventario.domain.entity';
import { EstadoItem } from '../../../../items/domain/entities/item.domain.entity';

export const INVENTARIO_USE_CASES = Symbol('INVENTARIO_USE_CASES');

export interface IInventarioUseCases {
  obtenerInventarios(): Promise<Inventario[]>;
  obtenerInventarioPorId(id: number): Promise<Inventario>;
  crearInventario(data: { estado: EstadoItem; id_item: number; id_sitio: number }): Promise<Inventario>;
}
