import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { ProductoEntity } from '../../../productos/infrastructure/entities/producto.typeorm.entity';
import { SitioEntity } from '../../../sitios/infrastructure/entities/sitio.typeorm.entity';

@Entity('inventarios')
export class InventarioEntity {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @Column({ name: 'cantidad_actual', type: 'int', default: 0 })
  cantidadActual!: number;

  @Column({ name: 'stock_minimo', type: 'int', default: 0 })
  stockMinimo!: number;

  @ManyToOne(() => ProductoEntity, (producto) => producto.inventarios)
  @JoinColumn({ name: 'producto_id' })
  producto!: ProductoEntity;

  @ManyToOne(() => SitioEntity, (sitio) => sitio.inventarios)
  @JoinColumn({ name: 'sitio_id' })
  sitio!: SitioEntity;
}
