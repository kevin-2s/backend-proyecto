import { Area } from '../../entities/area.domain.entity';

export const AREAS_USE_CASES = Symbol('AREAS_USE_CASES');

export interface IAreasUseCases {
  obtenerAreas(): Promise<Area[]>;
  obtenerAreaPorId(id: number): Promise<Area>;
  crearArea(data: { nombre: string; estado?: boolean }): Promise<Area>;
  actualizarArea(id: number, data: Partial<Area>): Promise<Area>;
  eliminarArea(id: number): Promise<void>;
}
