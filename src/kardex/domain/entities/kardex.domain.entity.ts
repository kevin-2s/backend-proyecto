import { Item } from '../../../items/domain/entities/item.domain.entity';
import { Usuario } from '../../../usuarios/domain/entities/usuario.domain.entity';

export enum TipoKardex {
  ENTRADA = 'ENTRADA',
  SALIDA = 'SALIDA',
}

export class Kardex {
  constructor(
    public readonly id_kardex: number,
    public tipo: TipoKardex,
    public cantidad: number,
    public saldo_anterior: number,
    public saldo_actual: number,
    public fecha: Date,
    public observacion: string | null,
    public id_item: number,
    public id_usuario: number,
    public item?: Item,
    public usuario?: Usuario,
  ) {}
}
