import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { ItemOrmEntity } from '../../../items/infrastructure/entities/item.orm-entity';
import { UsuarioOrmEntity } from '../../../usuarios/infrastructure/entities/usuario.orm-entity';

@Entity('prestamo')
export class PrestamoOrmEntity {
  @PrimaryGeneratedColumn()
  id_prestamo: number;

  @CreateDateColumn({ type: 'timestamp' })
  fecha_prestamo: Date;

  @Column({ type: 'timestamp' })
  fecha_devolucion_esperada: Date;

  @Column({ type: 'timestamp', nullable: true })
  fecha_devolucion_real: Date | null;

  @Column({ type: 'varchar', length: 20, default: 'ACTIVO' })
  estado: string;

  @Column({ type: 'text', nullable: true })
  observacion: string | null;

  @Column()
  id_item: number;

  @Column()
  id_usuario_solicitante: number;

  @Column()
  id_usuario_responsable: number;

  @ManyToOne(() => ItemOrmEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id_item' })
  item: ItemOrmEntity;

  @ManyToOne(() => UsuarioOrmEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id_usuario_solicitante' })
  usuario_solicitante: UsuarioOrmEntity;

  @ManyToOne(() => UsuarioOrmEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id_usuario_responsable' })
  usuario_responsable: UsuarioOrmEntity;
}
