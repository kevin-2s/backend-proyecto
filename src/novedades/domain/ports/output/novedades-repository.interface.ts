import { Novedad } from '../../entities/novedad.domain.entity';

export const NOVEDADES_REPOSITORY = Symbol('NOVEDADES_REPOSITORY');

export interface INovedadesRepository {
  findAll(): Promise<Novedad[]>;
  findByItem(id_item: number): Promise<Novedad[]>;
  findById(id: number): Promise<Novedad | null>;
  create(data: Omit<Novedad, 'id_novedad' | 'item' | 'usuario'>): Promise<Novedad>;
  update(id: number, data: Partial<Novedad>): Promise<Novedad>;
  delete(id: number): Promise<void>;
}
