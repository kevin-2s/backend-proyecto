import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { EstadoFisico, EstadoSolicitud } from '../../../shared/domain/enums';
import { ProductoEntity } from '../../../productos/infrastructure/entities/producto.typeorm.entity';
import { UsuarioEntity } from '../../../users/infrastructure/entities/usuario.typeorm.entity';
import { FichaEntity } from '../../../fichas/infrastructure/entities/ficha.typeorm.entity';
import { DevolucionEntity } from '../../../devoluciones/infrastructure/entities/devolucion.typeorm.entity';
import { ChequeoEntity } from '../../../chequeo/infrastructure/entities/chequeo.typeorm.entity';
import { ActaEntity } from '../../../actas/infrastructure/entities/acta.typeorm.entity';

@Entity('asignaciones')
export class AsignaEntity {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @Column({ name: 'estado_fisico', type: 'enum', enum: EstadoFisico })
  estadoFisico!: EstadoFisico;

  @Column({ name: 'estado_entrega', type: 'enum', enum: EstadoSolicitud })
  estadoEntrega!: EstadoSolicitud;

  @Column({ name: 'fecha_ent', type: 'timestamp with time zone' })
  fechaEnt!: Date;

  @Column({ name: 'fecha_devolucion_est', type: 'timestamp with time zone', nullable: true })
  fechaDevolucionEst!: Date;

  @Column({ name: 'observaciones', type: 'text', nullable: true })
  observaciones!: string;

  @ManyToOne(() => ProductoEntity, (producto) => producto.asignaciones)
  @JoinColumn({ name: 'producto_id' })
  producto!: ProductoEntity;

  @ManyToOne(() => UsuarioEntity, (usuario) => usuario.asignaciones)
  @JoinColumn({ name: 'usuario_id' })
  usuario!: UsuarioEntity;

  @ManyToOne(() => FichaEntity, (ficha) => ficha.asignaciones, { nullable: true })
  @JoinColumn({ name: 'ficha_id' })
  ficha!: FichaEntity;

  @OneToMany(() => DevolucionEntity, (devolucion) => devolucion.asigna)
  devoluciones!: DevolucionEntity[];

  @OneToOne(() => ChequeoEntity, (chequeo) => chequeo.asigna, { nullable: true })
  chequeo!: ChequeoEntity;

  @OneToOne(() => ActaEntity, (acta) => acta.asigna, { nullable: true })
  acta!: ActaEntity;
}
