import { Kardex, TipoKardex } from '../../entities/kardex.domain.entity';

export const KARDEX_USE_CASES = Symbol('KARDEX_USE_CASES');

export interface IKardexUseCases {
  obtenerKardex(): Promise<Kardex[]>;
  obtenerKardexPorItem(id_item: number): Promise<Kardex[]>;
  crearRegistroKardex(data: {
    tipo: TipoKardex;
    cantidad: number;
    saldo_anterior: number;
    saldo_actual: number;
    fecha: Date;
    observacion: string | null;
    id_item: number;
    id_usuario: number;
  }): Promise<Kardex>;
}
