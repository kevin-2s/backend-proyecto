import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { UsuarioOrmEntity } from '../../../usuarios/infrastructure/entities/usuario.orm-entity';
import { FichaOrmEntity } from '../../../fichas/infrastructure/entities/ficha.orm-entity';
import { EstadoSolicitud, TipoSolicitud } from '../../domain/entities/solicitud.domain.entity';

@Entity('solicitud')
export class SolicitudOrmEntity {
  @PrimaryGeneratedColumn()
  id_solicitud: number;

  @Column({ type: 'timestamp' })
  fecha: Date;

  @Column({ type: 'enum', enum: EstadoSolicitud, default: EstadoSolicitud.PENDIENTE })
  estado: EstadoSolicitud;

  @Column({ type: 'enum', enum: TipoSolicitud })
  tipo: TipoSolicitud;

  @Column({ type: 'text', nullable: true })
  observacion: string | null;

  @Column()
  id_usuario: number;

  @Column({ nullable: true })
  id_usuario_aprueba: number;

  @Column({ nullable: true })
  id_ficha: number;

  @ManyToOne(() => UsuarioOrmEntity)
  @JoinColumn({ name: 'id_usuario' })
  usuario: UsuarioOrmEntity;

  @ManyToOne(() => UsuarioOrmEntity, { nullable: true })
  @JoinColumn({ name: 'id_usuario_aprueba' })
  usuario_aprueba: UsuarioOrmEntity;

  @ManyToOne(() => FichaOrmEntity, { nullable: true })
  @JoinColumn({ name: 'id_ficha' })
  ficha: FichaOrmEntity;
}
