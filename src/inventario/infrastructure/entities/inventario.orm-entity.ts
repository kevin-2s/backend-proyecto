import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToOne,
  JoinColumn,
  Unique,
} from "typeorm";
import { ItemOrmEntity } from "../../../items/infrastructure/entities/item.orm-entity";
import { SitioOrmEntity } from "../../../sitios/infrastructure/entities/sitio.orm-entity";
import { EstadoItem } from "../../../items/domain/entities/item.domain.entity";

@Entity("inventario")
@Unique(["id_item"])
export class InventarioOrmEntity {
  @PrimaryGeneratedColumn()
  id_inventario: number;

  @Column({ type: "enum", enum: EstadoItem })
  estado: EstadoItem;

  @Column({ unique: true })
  id_item: number;

  @Column()
  id_sitio: number;

  @OneToOne(() => ItemOrmEntity)
  @JoinColumn({ name: "id_item" })
  item: ItemOrmEntity;

  @ManyToOne(() => SitioOrmEntity)
  @JoinColumn({ name: "id_sitio" })
  sitio: SitioOrmEntity;
}
