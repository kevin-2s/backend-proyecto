import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { ItemOrmEntity } from '../../../items/infrastructure/entities/item.orm-entity';
import { SitioOrmEntity } from '../../../sitios/infrastructure/entities/sitio.orm-entity';
import { UsuarioOrmEntity } from '../../../usuarios/infrastructure/entities/usuario.orm-entity';

@Entity('traslado')
export class TrasladoOrmEntity {
  @PrimaryGeneratedColumn()
  id_traslado: number;

  @Column()
  id_item: number;

  @Column()
  id_sitio_origen: number;

  @Column()
  id_sitio_destino: number;

  @Column()
  id_usuario_solicita: number;

  @Column({ type: 'varchar', length: 20, default: 'PENDIENTE' })
  estado: string;

  @CreateDateColumn({ type: 'timestamp' })
  fecha_solicitud: Date;

  @Column({ type: 'text', nullable: true })
  justificacion: string | null;

  @Column({ nullable: true })
  id_usuario_aprueba: number;

  @Column({ type: 'timestamp', nullable: true })
  fecha_resolucion: Date | null;

  @Column({ type: 'text', nullable: true })
  observacion_resolucion: string | null;

  @ManyToOne(() => ItemOrmEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id_item' })
  item: ItemOrmEntity;

  @ManyToOne(() => SitioOrmEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id_sitio_origen' })
  sitio_origen: SitioOrmEntity;

  @ManyToOne(() => SitioOrmEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id_sitio_destino' })
  sitio_destino: SitioOrmEntity;

  @ManyToOne(() => UsuarioOrmEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id_usuario_solicita' })
  usuario_solicita: UsuarioOrmEntity;

  @ManyToOne(() => UsuarioOrmEntity, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'id_usuario_aprueba' })
  usuario_aprueba: UsuarioOrmEntity;
}
