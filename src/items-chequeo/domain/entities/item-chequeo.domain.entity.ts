import { Chequeo } from "../../../chequeos/domain/entities/chequeo.domain.entity";
import { Item } from "../../../items/domain/entities/item.domain.entity";

export class ItemChequeo {
  constructor(
    public readonly id_item_chequeo: number,
    public estado: boolean,
    public observacion: string | null,
    public id_chequeo: number,
    public id_item: number,
    public chequeo?: Chequeo,
    public item?: Item,
  ) {}
}
