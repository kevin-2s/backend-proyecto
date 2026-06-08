import { Programa } from '../../entities/programa.domain.entity';

export const PROGRAMAS_REPOSITORY = Symbol('PROGRAMAS_REPOSITORY');

export interface IProgramasRepository {
  findAll(): Promise<Programa[]>;
  findById(id: number): Promise<Programa | null>;
  create(data: Partial<Omit<Programa, 'id_programa'>>): Promise<Programa>;
  update(id: number, data: Partial<Programa>): Promise<Programa>;
  delete(id: number): Promise<void>;
}
