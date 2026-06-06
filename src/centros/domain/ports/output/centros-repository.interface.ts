import { Centro } from '../../entities/centro.domain.entity';

export const CENTROS_REPOSITORY = Symbol('CENTROS_REPOSITORY');

export interface ICentrosRepository {
  findAll(): Promise<Centro[]>;
  findById(id: number): Promise<Centro | null>;
  create(centro: Partial<Omit<Centro, 'id_centro'>>): Promise<Centro>;
  update(id: number, centro: Partial<Centro>): Promise<Centro>;
  delete(id: number): Promise<void>;
}
