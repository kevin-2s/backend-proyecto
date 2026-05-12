import { Chequeo } from '../../entities/chequeo.domain.entity';

export const CHEQUEOS_REPOSITORY = Symbol('CHEQUEOS_REPOSITORY');

export interface IChequeosRepository {
  findAll(): Promise<Chequeo[]>;
  findById(id: number): Promise<Chequeo | null>;
  create(chequeo: Omit<Chequeo, 'id_chequeo' | 'usuario'>): Promise<Chequeo>;
}
