import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToOne } from 'typeorm';
import { EstadoFisico } from '../../../shared/domain/enums';
import { AsignaEntity } from '../../../asignaciones/infrastructure/entities/asigna.typeorm.entity';
import { ProductoEntity } from '../../../productos/infrastructure/entities/producto.typeorm.entity';
import { MovimientoEntity } from '../../../movimientos/infrastructure/entities/movimiento.typeorm.entity';
import { ChequeoEntity } from '../../../chequeo/infrastructure/entities/chequeo.typeorm.entity';
import { ActaEntity } from '../../../actas/infrastructure/entities/acta.typeorm.entity';

@Entity('devoluciones')
export class DevolucionEntity {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @Column({ name: 'estado_fisico', type: 'enum', enum: EstadoFisico })
  estadoFisico!: EstadoFisico;

  @Column({ name: 'fecha_real', type: 'timestamp with time zone' })
  fechaReal!: Date;

  @Column({ name: 'observaciones', type: 'text', nullable: true })
  observaciones!: string;

  @ManyToOne(() => AsignaEntity, (asigna) => asigna.devoluciones)
  @JoinColumn({ name: 'asigna_id' })
  asigna!: AsignaEntity;

  @ManyToOne(() => ProductoEntity, (producto) => producto.devoluciones)
  @JoinColumn({ name: 'producto_id' })
  producto!: ProductoEntity;

  @OneToOne(() => MovimientoEntity, (movimiento) => movimiento.devolucion)
  @JoinColumn({ name: 'movimiento_id' })
  movimiento!: MovimientoEntity;

  @OneToOne(() => ChequeoEntity, (chequeo) => chequeo.devolucion, { nullable: true })
  chequeo!: ChequeoEntity;

  @OneToOne(() => ActaEntity, (acta) => acta.devolucion, { nullable: true })
  acta!: ActaEntity;
}
