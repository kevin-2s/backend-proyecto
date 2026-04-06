import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { SolicitudEntity } from './solicitud.typeorm.entity';
import { ProductoEntity } from '../../../productos/infrastructure/entities/producto.typeorm.entity';

@Entity('detalles')
export class DetalleEntity {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @Column({ name: 'cantidad_p', type: 'int' })
  cantidadP!: number;

  @Column({ name: 'cantidad_entregada', type: 'int', default: 0 })
  cantidadEntregada!: number;

  @ManyToOne(() => SolicitudEntity, (solicitud) => solicitud.detalles)
  @JoinColumn({ name: 'solicitud_id' })
  solicitud!: SolicitudEntity;

  @ManyToOne(() => ProductoEntity, (producto) => producto.detalles)
  @JoinColumn({ name: 'producto_id' })
  producto!: ProductoEntity;
}
