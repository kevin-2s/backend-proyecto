import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToOne,
  OneToMany,
  JoinColumn,
  Unique,
} from "typeorm";
import { UsuarioOrmEntity } from "../../../usuarios/infrastructure/entities/usuario.orm-entity";
import { SolicitudOrmEntity } from "../../../solicitudes/infrastructure/entities/solicitud.orm-entity";
import { ItemChequeoOrmEntity } from "../../../items-chequeo/infrastructure/entities/item-chequeo.orm-entity";

@Entity("chequeo")
@Unique(["id_solicitud"])
export class ChequeoOrmEntity {
  @PrimaryGeneratedColumn()
  id_chequeo: number;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  fecha: Date;

  @Column()
  id_usuario: number;

  @Column({ unique: true })
  id_solicitud: number;

  @ManyToOne(() => UsuarioOrmEntity)
  @JoinColumn({ name: "id_usuario" })
  usuario: UsuarioOrmEntity;

  @OneToOne(() => SolicitudOrmEntity)
  @JoinColumn({ name: "id_solicitud" })
  solicitud: SolicitudOrmEntity;

  @OneToMany(() => ItemChequeoOrmEntity, (itemChequeo) => itemChequeo.chequeo)
  itemsChequeo: ItemChequeoOrmEntity[];
}
