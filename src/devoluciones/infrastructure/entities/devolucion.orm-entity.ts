import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { SolicitudOrmEntity } from '../../../solicitudes/infrastructure/entities/solicitud.orm-entity';
import { UsuarioOrmEntity } from '../../../usuarios/infrastructure/entities/usuario.orm-entity';

@Entity('devolucion')
export class DevolucionOrmEntity {
  @PrimaryGeneratedColumn()
  id_devolucion: number;

  @Column({ type: 'timestamp' })
  fecha: Date;

  @Column()
  id_solicitud: number;

  @Column()
  id_usuario_recibe: number;

  @ManyToOne(() => SolicitudOrmEntity)
  @JoinColumn({ name: 'id_solicitud' })
  solicitud: SolicitudOrmEntity;

  @ManyToOne(() => UsuarioOrmEntity)
  @JoinColumn({ name: 'id_usuario_recibe' })
  usuario_recibe: UsuarioOrmEntity;
}
