import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToOne,
  JoinColumn,
  Unique,
} from "typeorm";
import { SolicitudOrmEntity } from "../../../solicitudes/infrastructure/entities/solicitud.orm-entity";
import { UsuarioOrmEntity } from "../../../usuarios/infrastructure/entities/usuario.orm-entity";

@Entity("acta")
@Unique(["id_solicitud"])
export class ActaOrmEntity {
  @PrimaryGeneratedColumn()
  id_acta: number;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  fecha: Date;

  @Column({ type: "varchar", nullable: true })
  url_pdf: string | null;

  @Column({ unique: true })
  id_solicitud: number;

  @Column()
  id_usuario: number;

  @OneToOne(() => SolicitudOrmEntity)
  @JoinColumn({ name: "id_solicitud" })
  solicitud: SolicitudOrmEntity;

  @ManyToOne(() => UsuarioOrmEntity)
  @JoinColumn({ name: "id_usuario" })
  usuario: UsuarioOrmEntity;
}
