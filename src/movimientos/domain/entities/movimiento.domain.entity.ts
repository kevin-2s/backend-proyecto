import { Item } from '../../../items/domain/entities/item.domain.entity';
import { TipoMovimiento } from '../../../tipos-movimiento/domain/entities/tipo-movimiento.domain.entity';
import { Usuario } from '../../../usuarios/domain/entities/usuario.domain.entity';

export class Movimiento {
  constructor(
    public readonly id_movimiento: number,
    public fecha: Date,
    public observacion: string | null,
    public id_item: number,
    public id_tipo_movimiento: number,
    public id_usuario: number,
    public item?: Item,
    public tipoMovimiento?: TipoMovimiento,
    public usuario?: Usuario,
  ) {}
}
