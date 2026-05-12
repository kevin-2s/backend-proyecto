import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { ProductoOrmEntity } from '../../../productos/infrastructure/entities/producto.orm-entity';
import { EstadoItem } from '../../domain/entities/item.domain.entity';

@Entity('item')
export class ItemOrmEntity {
  @PrimaryGeneratedColumn()
  id_item: number;

  @Column({ type: 'varchar', length: 150, unique: true })
  codigo_sku: string;

  @Column({ type: 'enum', enum: EstadoItem, default: EstadoItem.DISPONIBLE })
  estado: EstadoItem;

  @Column()
  id_producto: number;

  @ManyToOne(() => ProductoOrmEntity)
  @JoinColumn({ name: 'id_producto' })
  producto: ProductoOrmEntity;
}
