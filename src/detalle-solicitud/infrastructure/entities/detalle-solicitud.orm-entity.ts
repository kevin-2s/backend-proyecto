import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { SolicitudOrmEntity } from '../../../solicitudes/infrastructure/entities/solicitud.orm-entity';
import { ProductoOrmEntity } from '../../../productos/infrastructure/entities/producto.orm-entity';

@Entity('detalle_solicitud')
export class DetalleSolicitudOrmEntity {
  @PrimaryGeneratedColumn()
  id_detalle: number;

  @Column({ type: 'int' })
  cantidad: number;

  @Column()
  id_solicitud: number;

  @Column()
  id_producto: number;

  @ManyToOne(() => SolicitudOrmEntity)
  @JoinColumn({ name: 'id_solicitud' })
  solicitud: SolicitudOrmEntity;

  @ManyToOne(() => ProductoOrmEntity)
  @JoinColumn({ name: 'id_producto' })
  producto: ProductoOrmEntity;
}
