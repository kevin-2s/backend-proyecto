import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { CategoriaEntity } from '../../../categoria/infrastructure/entities/categoria.typeorm.entity';
import { InventarioEntity } from '../../../inventario/infrastructure/entities/inventario.typeorm.entity';
import { MovimientoEntity } from '../../../movimientos/infrastructure/entities/movimiento.typeorm.entity';
import { AsignaEntity } from '../../../asignaciones/infrastructure/entities/asigna.typeorm.entity';
import { DevolucionEntity } from '../../../devoluciones/infrastructure/entities/devolucion.typeorm.entity';
import { NecesidadEntity } from '../../../necesidades/infrastructure/entities/necesidad.typeorm.entity';
import { DetalleEntity } from '../../../solicitudes/infrastructure/entities/detalle.typeorm.entity';

@Entity('productos')
export class ProductoEntity {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @Column({ name: 'nombre', type: 'varchar' })
  nombre!: string;

  @Column({ name: 'descripcion', type: 'text' })
  descripcion!: string;

  @Column({ name: 'codigo_unspsc', type: 'varchar' })
  codigoUNSPSC!: string;

  @Column({ name: 'sku', type: 'varchar', unique: true })
  SKU!: string;

  @Column({ name: 'imagen_url', type: 'varchar' })
  imagenUrl!: string;

  @ManyToOne(() => CategoriaEntity, (categoria) => categoria.productos)
  @JoinColumn({ name: 'categoria_id' })
  categoria!: CategoriaEntity;

  @OneToMany(() => InventarioEntity, (inventario) => inventario.producto)
  inventarios!: InventarioEntity[];

  @OneToMany(() => MovimientoEntity, (movimiento) => movimiento.producto)
  movimientos!: MovimientoEntity[];

  @OneToMany(() => AsignaEntity, (asigna) => asigna.producto)
  asignaciones!: AsignaEntity[];

  @OneToMany(() => DevolucionEntity, (devolucion) => devolucion.producto)
  devoluciones!: DevolucionEntity[];

  @OneToMany(() => NecesidadEntity, (necesidad) => necesidad.producto)
  necesidades!: NecesidadEntity[];

  @OneToMany(() => DetalleEntity, (detalle) => detalle.producto)
  detalles!: DetalleEntity[];
}
