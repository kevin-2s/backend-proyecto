import { Area } from '../../entities/area.domain.entity';

export const AREAS_REPOSITORY = Symbol('AREAS_REPOSITORY');

export interface IAreasRepository {
  findAll(): Promise<Area[]>;
  findById(id: number): Promise<Area | null>;
  create(area: Partial<Omit<Area, 'id_area' | 'sitio'>>): Promise<Area>;
  update(id: number, area: Partial<Area>): Promise<Area>;
  delete(id: number): Promise<void>;
}
