import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { ChequeoEntity } from './chequeo.typeorm.entity';

@Entity('items_chequeo')
export class ItemChequeoEntity {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @Column({ name: 'descripcion', type: 'varchar' })
  descripcion!: string;

  @Column({ name: 'estado_item', type: 'boolean' })
  estadoItem!: boolean;

  @Column({ name: 'observacion', type: 'text', nullable: true })
  observacion!: string;

  @ManyToOne(() => ChequeoEntity, (chequeo) => chequeo.items)
  @JoinColumn({ name: 'chequeo_id' })
  chequeo!: ChequeoEntity;
}
