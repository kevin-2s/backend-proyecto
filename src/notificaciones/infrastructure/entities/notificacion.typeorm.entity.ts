import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { UsuarioEntity } from '../../../users/infrastructure/entities/usuario.typeorm.entity';

@Entity('notificaciones')
export class NotificacionEntity {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @Column({ name: 'mensaje', type: 'text' })
  mensaje!: string;

  @Column({ name: 'leida', type: 'boolean', default: false })
  leida!: boolean;

  @CreateDateColumn({ name: 'fecha_envio', type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP' })
  fechaEnvio!: Date;

  @Column({ name: 'tipo_evento', type: 'varchar' })
  tipoEvento!: string;

  @ManyToOne(() => UsuarioEntity, (usuario) => usuario.notificaciones)
  @JoinColumn({ name: 'usuario_id' })
  usuario!: UsuarioEntity;
}
