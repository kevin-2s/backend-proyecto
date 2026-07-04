import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { UsuarioOrmEntity } from '../../../usuarios/infrastructure/entities/usuario.orm-entity';
import { FichaOrmEntity } from '../../../fichas/infrastructure/entities/ficha.orm-entity';
import { ProductoOrmEntity } from '../../../productos/infrastructure/entities/producto.orm-entity';
import { EstadoSolicitud, TipoSolicitud } from '../../domain/entities/solicitud.domain.entity';

@Entity('solicitud')
export class SolicitudOrmEntity {
  @PrimaryGeneratedColumn()
  id_solicitud: number;

  @Column({ type: 'timestamp' })
  fecha: Date;

  @Column({ type: 'varchar', length: 50, default: 'PENDIENTE' })
  estado: string;

  @Column({ type: 'varchar', length: 50 })
  tipo: string;

  @Column({ type: 'text', nullable: true })
  observacion: string | null;

  @Column()
  id_usuario: number;

  @Column({ nullable: true })
  id_usuario_aprueba: number;

  @Column({ nullable: true })
  id_ficha: number;

  @Column({ nullable: true })
  id_producto: number | null;

  @Column({ type: 'int', default: 1 })
  cantidad: number;

  @Column({ type: 'date', nullable: true })
  fecha_devolucion: Date | null;

  @ManyToOne(() => UsuarioOrmEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id_usuario' })
  usuario: UsuarioOrmEntity;

  @ManyToOne(() => UsuarioOrmEntity, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'id_usuario_aprueba' })
  usuario_aprueba: UsuarioOrmEntity;

  @ManyToOne(() => FichaOrmEntity, { nullable: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id_ficha' })
  ficha: FichaOrmEntity;

  @ManyToOne(() => ProductoOrmEntity, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'id_producto' })
  producto: ProductoOrmEntity;
}
