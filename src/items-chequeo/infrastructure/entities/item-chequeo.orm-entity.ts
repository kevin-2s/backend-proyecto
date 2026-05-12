import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { ChequeoOrmEntity } from "../../../chequeos/infrastructure/entities/chequeo.orm-entity";
import { ItemOrmEntity } from "../../../items/infrastructure/entities/item.orm-entity";

@Entity("item_chequeo")
export class ItemChequeoOrmEntity {
  @PrimaryGeneratedColumn()
  id_item_chequeo: number;

  @Column({ type: "boolean" })
  estado: boolean;

  @Column({ type: "text", nullable: true })
  observacion: string | null;

  @Column()
  id_chequeo: number;

  @Column()
  id_item: number;

  @ManyToOne(() => ChequeoOrmEntity, (chequeo) => chequeo.itemsChequeo)
  @JoinColumn({ name: "id_chequeo" })
  chequeo: ChequeoOrmEntity;

  @ManyToOne(() => ItemOrmEntity)
  @JoinColumn({ name: "id_item" })
  item: ItemOrmEntity;
}
