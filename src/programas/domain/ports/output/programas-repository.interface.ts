import { Programa } from '../../entities/programa.domain.entity';

export const PROGRAMAS_REPOSITORY = Symbol('PROGRAMAS_REPOSITORY');

export interface IProgramasRepository {
  findAll(): Promise<Programa[]>;
  findById(id: number): Promise<Programa | null>;
  create(programa: Partial<Omit<Programa, 'id_programa' | 'area'>>): Promise<Programa>;
  update(id: number, programa: Partial<Programa>): Promise<Programa>;
  delete(id: number): Promise<void>;
}
