import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { UsuarioOrmEntity } from "../../../usuarios/infrastructure/entities/usuario.orm-entity";

@Entity("notificacion")
export class NotificacionOrmEntity {
  @PrimaryGeneratedColumn()
  id_notificacion: number;

  @Column({ type: "text" })
  mensaje: string;

  @Column({ type: "boolean", default: false })
  leida: boolean;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  fecha: Date;

  @Column()
  id_usuario: number;

  @ManyToOne(() => UsuarioOrmEntity)
  @JoinColumn({ name: "id_usuario" })
  usuario: UsuarioOrmEntity;
}
