import { Asignacion } from '../../entities/asignacion.domain.entity';

export const ASIGNACIONES_REPOSITORY = Symbol('ASIGNACIONES_REPOSITORY');

export interface IAsignacionesRepository {
  findAll(): Promise<Asignacion[]>;
  findById(id: number): Promise<Asignacion | null>;
  descontarStock(id_producto: number, cantidad: number): Promise<number[]>;
  restaurarStock(id_producto: number, cantidad: number): Promise<void>;
  restaurarStockPorItems(itemIds: number[]): Promise<void>;
  vincularItems(id_asignacion: number, itemIds: number[]): Promise<void>;
  obtenerItemsDeAsignacion(id_asignacion: number): Promise<number[]>;
  obtenerItemParaAsignar(id_item: number): Promise<{ id_item: number; estado: string; id_producto: number } | null>;
  marcarItemComoPrestado(id_item: number): Promise<void>;
  incrementarCantidad(id_asignacion: number, incremento: number): Promise<void>;
  create(data: Omit<Asignacion, 'id_asignacion' | 'ficha' | 'producto' | 'usuario_asigna'>): Promise<Asignacion>;
  update(id: number, data: Partial<Asignacion>): Promise<Asignacion>;
  delete(id: number): Promise<void>;
}
