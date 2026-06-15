import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { ItemOrmEntity } from '../../../items/infrastructure/entities/item.orm-entity';
import { UsuarioOrmEntity } from '../../../usuarios/infrastructure/entities/usuario.orm-entity';

@Entity('novedad')
export class NovedadOrmEntity {
  @PrimaryGeneratedColumn()
  id_novedad: number;

  @Column({ type: 'varchar', length: 50 })
  tipo: string;

  @Column({ type: 'text' })
  descripcion: string;

  @Column({ type: 'varchar', length: 20, default: 'PENDIENTE' })
  estado: string;

  @CreateDateColumn({ type: 'timestamp' })
  fecha: Date;

  @Column({ nullable: true })
  id_item: number | null;

  @Column()
  id_usuario: number;

  @ManyToOne(() => ItemOrmEntity, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'id_item' })
  item: ItemOrmEntity | null;

  @ManyToOne(() => UsuarioOrmEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id_usuario' })
  usuario: UsuarioOrmEntity;
}
