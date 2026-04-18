import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { ItemOrmEntity } from '../../../items/infrastructure/entities/item.orm-entity';
import { SitioOrmEntity } from '../../../sitios/infrastructure/entities/sitio.orm-entity';
import { EstadoItem } from '../../../items/domain/entities/item.domain.entity';

@Entity('inventario')
export class InventarioOrmEntity {
  @PrimaryGeneratedColumn()
  id_inventario: number;

  @Column({ type: 'enum', enum: EstadoItem })
  estado: EstadoItem;

  @Column()
  id_item: number;

  @Column()
  id_sitio: number;

  @ManyToOne(() => ItemOrmEntity)
  @JoinColumn({ name: 'id_item' })
  item: ItemOrmEntity;

  @ManyToOne(() => SitioOrmEntity)
  @JoinColumn({ name: 'id_sitio' })
  sitio: SitioOrmEntity;
}
