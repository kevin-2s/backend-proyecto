import { Item } from '../../../items/domain/entities/item.domain.entity';
import { Sitio } from '../../../sitios/domain/entities/sitio.domain.entity';
import { EstadoItem } from '../../../items/domain/entities/item.domain.entity';

export class Inventario {
  constructor(
    public readonly id_inventario: number,
    public estado: EstadoItem,
    public id_item: number,
    public id_sitio: number,
    public item?: Item,
    public sitio?: Sitio,
  ) {}
}
