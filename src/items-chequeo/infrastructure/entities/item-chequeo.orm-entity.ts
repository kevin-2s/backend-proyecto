import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { ChequeoOrmEntity } from '../../../chequeos/infrastructure/entities/chequeo.orm-entity';
import { ItemOrmEntity } from '../../../items/infrastructure/entities/item.orm-entity';
import { EstadoEncontrado } from '../../domain/entities/item-chequeo.domain.entity';

@Entity('item_chequeo')
export class ItemChequeoOrmEntity {
  @PrimaryGeneratedColumn()
  id_item_chequeo: number;

  @Column({ type: 'enum', enum: EstadoEncontrado })
  estado_encontrado: EstadoEncontrado;

  @Column()
  id_chequeo: number;

  @Column()
  id_item: number;

  @ManyToOne(() => ChequeoOrmEntity)
  @JoinColumn({ name: 'id_chequeo' })
  chequeo: ChequeoOrmEntity;

  @ManyToOne(() => ItemOrmEntity)
  @JoinColumn({ name: 'id_item' })
  item: ItemOrmEntity;
}
