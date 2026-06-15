import { Asignacion } from '../../entities/asignacion.domain.entity';

export const ASIGNACIONES_REPOSITORY = Symbol('ASIGNACIONES_REPOSITORY');

export interface IAsignacionesRepository {
  findAll(): Promise<Asignacion[]>;
  findById(id: number): Promise<Asignacion | null>;
  descontarStock(id_producto: number, cantidad: number): Promise<void>;
  restaurarStock(id_producto: number, cantidad: number): Promise<void>;
  create(data: Omit<Asignacion, 'id_asignacion' | 'ficha' | 'producto' | 'usuario_asigna'>): Promise<Asignacion>;
  update(id: number, data: Partial<Asignacion>): Promise<Asignacion>;
  delete(id: number): Promise<void>;
}
