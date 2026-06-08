import { Centro } from '../../entities/centro.domain.entity';

export const CENTROS_USE_CASES = Symbol('CENTROS_USE_CASES');

export interface ICentrosUseCases {
  obtenerCentros(): Promise<Centro[]>;
  obtenerCentroPorId(id: number): Promise<Centro>;
  crearCentro(data: { nombre: string; codigo: string; regional: string; estado?: boolean }): Promise<Centro>;
  actualizarCentro(id: number, data: Partial<Centro>): Promise<Centro>;
  eliminarCentro(id: number): Promise<void>;
}
