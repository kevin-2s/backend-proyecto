import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { SolicitudOrmEntity } from '../../../solicitudes/infrastructure/entities/solicitud.orm-entity';
import { DevolucionOrmEntity } from '../../../devoluciones/infrastructure/entities/devolucion.orm-entity';
import { TipoActa } from '../../domain/entities/acta.domain.entity';

@Entity('acta')
export class ActaOrmEntity {
  @PrimaryGeneratedColumn()
  id_acta: number;

  @Column({ type: 'enum', enum: TipoActa })
  tipo: TipoActa;

  @Column({ type: 'varchar' })
  archivo_url: string;

  @Column({ nullable: true })
  id_solicitud: number;

  @Column({ nullable: true })
  id_devolucion: number;

  @ManyToOne(() => SolicitudOrmEntity, { nullable: true })
  @JoinColumn({ name: 'id_solicitud' })
  solicitud: SolicitudOrmEntity;

  @ManyToOne(() => DevolucionOrmEntity, { nullable: true })
  @JoinColumn({ name: 'id_devolucion' })
  devolucion: DevolucionOrmEntity;
}
