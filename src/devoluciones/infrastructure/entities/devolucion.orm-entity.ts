import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  Unique,
} from "typeorm";
import { SolicitudOrmEntity } from "../../../solicitudes/infrastructure/entities/solicitud.orm-entity";
import { ItemOrmEntity } from "../../../items/infrastructure/entities/item.orm-entity";

export enum EstadoDevolucion {
  BUENO = "BUENO",
  REGULAR = "REGULAR",
  DAÑADO = "DAÑADO",
  PERDIDO = "PERDIDO",
}

@Entity("devolucion")
@Unique(["id_solicitud"])
export class DevolucionOrmEntity {
  @PrimaryGeneratedColumn()
  id_devolucion: number;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  fecha: Date;

  @Column({ type: "enum", enum: EstadoDevolucion })
  estado: EstadoDevolucion;

  @Column({ type: "text", nullable: true })
  observacion: string | null;

  @Column({ unique: true })
  id_solicitud: number;

  @Column()
  id_item: number;

  @ManyToOne(() => SolicitudOrmEntity)
  @JoinColumn({ name: "id_solicitud" })
  solicitud: SolicitudOrmEntity;

  @ManyToOne(() => ItemOrmEntity)
  @JoinColumn({ name: "id_item" })
  item: ItemOrmEntity;
}
