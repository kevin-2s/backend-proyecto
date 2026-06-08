import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { ProveedorOrmEntity } from '../../../proveedores/infrastructure/entities/proveedor.orm-entity';
import { ItemOrmEntity } from '../../../items/infrastructure/entities/item.orm-entity';

@Entity('ordenes_compra')
export class OrdenCompraOrmEntity {
  @PrimaryGeneratedColumn()
  id_orden: number;

  @Column()
  id_proveedor: number;

  @Column()
  id_item: number;

  @Column({ type: 'int' })
  cantidad: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  precio_unitario: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  precio_total: number;

  @CreateDateColumn({ type: 'timestamp' })
  fecha_orden: Date;

  @Column({ type: 'varchar', length: 20, default: 'PENDIENTE' })
  estado: string; // 'PENDIENTE', 'RECIBIDA', 'CANCELADA'

  @Column({ type: 'text', nullable: true })
  observacion: string;

  @ManyToOne(() => ProveedorOrmEntity, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'id_proveedor' })
  proveedor: ProveedorOrmEntity;

  @ManyToOne(() => ItemOrmEntity, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'id_item' })
  item: ItemOrmEntity;
}
