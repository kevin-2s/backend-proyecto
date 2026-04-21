import { Acta } from '../../entities/acta.domain.entity';

export const ACTAS_REPOSITORY = Symbol('ACTAS_REPOSITORY');

export interface IActasRepository {
  findAll(): Promise<Acta[]>;
  findById(id: number): Promise<Acta | null>;
  create(acta: Omit<Acta, 'id_acta' | 'solicitud' | 'devolucion'>): Promise<Acta>;
}
