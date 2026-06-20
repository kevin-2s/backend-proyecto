import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { ProductoOrmEntity } from '../../../productos/infrastructure/entities/producto.orm-entity';
import { EstadoItem } from '../../domain/entities/item.domain.entity';

@Entity('item')
export class ItemOrmEntity {
  @PrimaryGeneratedColumn()
  id_item: number;

  @Column({ type: 'varchar', length: 150, nullable: true })
  codigo_sku: string | null;

  @Column({ type: 'varchar', length: 100, unique: true, nullable: true })
  placa_sena: string | null;

  @Column({ type: 'varchar', length: 50, default: 'DISPONIBLE' })
  estado: string;

  @Column()
  id_producto: number;

  @ManyToOne(() => ProductoOrmEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id_producto' })
  producto: ProductoOrmEntity;
}
