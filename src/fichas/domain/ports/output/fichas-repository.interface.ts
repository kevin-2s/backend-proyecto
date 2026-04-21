import { Ficha } from '../../entities/ficha.domain.entity';

export const FICHAS_REPOSITORY = Symbol('FICHAS_REPOSITORY');

export interface IFichasRepository {
  findAll(): Promise<Ficha[]>;
  findById(id: number): Promise<Ficha | null>;
  create(ficha: Omit<Ficha, 'id_ficha' | 'responsable'>): Promise<Ficha>;
}
