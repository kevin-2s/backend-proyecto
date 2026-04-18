import { Kardex } from '../../entities/kardex.domain.entity';

export const KARDEX_REPOSITORY = Symbol('KARDEX_REPOSITORY');

export interface IKardexRepository {
  findAll(): Promise<Kardex[]>;
  findByItemId(itemId: number): Promise<Kardex[]>;
  create(kardex: Omit<Kardex, 'id_kardex' | 'item' | 'usuario'>): Promise<Kardex>;
}
