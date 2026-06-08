import { Area } from '../../entities/area.domain.entity';

export const AREAS_REPOSITORY = Symbol('AREAS_REPOSITORY');

export interface IAreasRepository {
  findAll(): Promise<Area[]>;
  findById(id: number): Promise<Area | null>;
  create(data: Partial<Omit<Area, 'id_area'>>): Promise<Area>;
  update(id: number, data: Partial<Area>): Promise<Area>;
  delete(id: number): Promise<void>;
}
