import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { ItemOrmEntity } from '../../../items/infrastructure/entities/item.orm-entity';
import { UsuarioOrmEntity } from '../../../usuarios/infrastructure/entities/usuario.orm-entity';

@Entity('prestamos')
export class PrestamoOrmEntity {
  @PrimaryGeneratedColumn()
  id_prestamo: number;

  @Column()
  id_item: number;

  @Column()
  id_usuario: number;

  @Column({ nullable: true })
  id_ficha: number;

  @CreateDateColumn({ type: 'timestamp' })
  fecha_prestamo: Date;

  @Column({ type: 'timestamp' })
  fecha_devolucion_esperada: Date;

  @Column({ type: 'timestamp', nullable: true })
  fecha_devolucion_real: Date;

  @Column({ type: 'varchar', length: 20, default: 'ACTIVO' })
  estado: string; // ACTIVO, DEVUELTO, VENCIDO

  @Column({ type: 'varchar', length: 20, nullable: true })
  estado_devolucion: string; // BUENO, REGULAR, DAÑADO, PERDIDO

  @Column({ type: 'text', nullable: true })
  observacion: string;

  @Column({ type: 'text', nullable: true })
  observacion_devolucion: string;

  @ManyToOne(() => ItemOrmEntity, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'id_item' })
  item: ItemOrmEntity;

  @ManyToOne(() => UsuarioOrmEntity, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'id_usuario' })
  usuario: UsuarioOrmEntity;
}
