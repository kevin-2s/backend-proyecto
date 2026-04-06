import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { EstadoSolicitud } from '../../../shared/domain/enums';
import { UsuarioEntity } from '../../../users/infrastructure/entities/usuario.typeorm.entity';
import { DetalleEntity } from './detalle.typeorm.entity';

@Entity('solicitudes')
export class SolicitudEntity {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @CreateDateColumn({ name: 'fecha_sol', type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP' })
  fechaSol!: Date;

  @Column({ name: 'fecha_respuesta', type: 'timestamp with time zone', nullable: true })
  fechaRespuesta!: Date;

  @Column({ name: 'estado_sol', type: 'enum', enum: EstadoSolicitud, default: EstadoSolicitud.PENDIENTE })
  estadoSol!: EstadoSolicitud;

  @Column({ name: 'justificacion', type: 'text' })
  justificacion!: string;

  @Column({ name: 'observacion_respuesta', type: 'text', nullable: true })
  observacionRespuesta!: string;

  @ManyToOne(() => UsuarioEntity, (usuario) => usuario.solicitudes)
  @JoinColumn({ name: 'usuario_id' })
  usuario!: UsuarioEntity;

  @ManyToOne(() => UsuarioEntity, (usuario) => usuario.solicitudesRespondidas, { nullable: true })
  @JoinColumn({ name: 'usuario_responde_id' })
  usuarioResponde!: UsuarioEntity;

  @OneToMany(() => DetalleEntity, (detalle) => detalle.solicitud)
  detalles!: DetalleEntity[];
}
