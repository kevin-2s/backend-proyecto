import { Sede } from '../../entities/sede.domain.entity';

export const SEDES_REPOSITORY = Symbol('SEDES_REPOSITORY');

export interface ISedesRepository {
  findAll(): Promise<Sede[]>;
  findById(id: number): Promise<Sede | null>;
  create(sede: Omit<Sede, 'id_sede' | 'centro'>): Promise<Sede>;
  update(id: number, sede: Partial<Sede>): Promise<Sede>;
  delete(id: number): Promise<void>;
}
