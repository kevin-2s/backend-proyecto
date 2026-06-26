import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { AsignacionOrmEntity } from './asignacion.orm-entity';
import { ItemOrmEntity } from '../../../items/infrastructure/entities/item.orm-entity';

@Entity('asignacion_item')
export class AsignacionItemOrmEntity {
  @PrimaryGeneratedColumn()
  id_asignacion_item: number;

  @Column()
  id_asignacion: number;

  @Column()
  id_item: number;

  @ManyToOne(() => AsignacionOrmEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id_asignacion' })
  asignacion: AsignacionOrmEntity;

  @ManyToOne(() => ItemOrmEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id_item' })
  item: ItemOrmEntity;
}
