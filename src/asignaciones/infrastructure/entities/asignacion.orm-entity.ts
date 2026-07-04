import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { FichaOrmEntity } from '../../../fichas/infrastructure/entities/ficha.orm-entity';
import { ProductoOrmEntity } from '../../../productos/infrastructure/entities/producto.orm-entity';
import { UsuarioOrmEntity } from '../../../usuarios/infrastructure/entities/usuario.orm-entity';

@Entity('asignacion')
export class AsignacionOrmEntity {
  @PrimaryGeneratedColumn()
  id_asignacion: number;

  @Column()
  id_ficha: number;

  @Column()
  id_producto: number;

  @Column({ type: 'int' })
  cantidad: number;

  @CreateDateColumn({ type: 'timestamp' })
  fecha_asignacion: Date;

  @Column()
  id_usuario_asigna: number;

  @Column({ type: 'text', nullable: true })
  observacion: string | null;

  @Column({ type: 'varchar', length: 20, default: 'ACTIVA' })
  estado: string;

  @Column({ type: 'date', nullable: true })
  fecha_devolucion: Date | null;

  @ManyToOne(() => FichaOrmEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id_ficha' })
  ficha: FichaOrmEntity;

  @ManyToOne(() => ProductoOrmEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id_producto' })
  producto: ProductoOrmEntity;

  @ManyToOne(() => UsuarioOrmEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id_usuario_asigna' })
  usuario_asigna: UsuarioOrmEntity;
}
