import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, OneToOne } from 'typeorm';
import { TipoMovimiento } from '../../../shared/domain/enums';
import { ProductoEntity } from '../../../productos/infrastructure/entities/producto.typeorm.entity';
import { UsuarioEntity } from '../../../users/infrastructure/entities/usuario.typeorm.entity';
import { SitioEntity } from '../../../sitios/infrastructure/entities/sitio.typeorm.entity';
import { DevolucionEntity } from '../../../devoluciones/infrastructure/entities/devolucion.typeorm.entity';

@Entity('movimientos')
export class MovimientoEntity {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @Column({ name: 'tipo', type: 'enum', enum: TipoMovimiento })
  tipo!: TipoMovimiento;

  @Column({ name: 'cantidad', type: 'int' })
  cantidad!: number;

  @CreateDateColumn({ name: 'fecha', type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP' })
  fecha!: Date;

  @Column({ name: 'observaciones', type: 'text', nullable: true })
  observaciones!: string;

  @ManyToOne(() => ProductoEntity, (producto) => producto.movimientos)
  @JoinColumn({ name: 'producto_id' })
  producto!: ProductoEntity;

  @ManyToOne(() => UsuarioEntity, (usuario) => usuario.movimientos)
  @JoinColumn({ name: 'usuario_id' })
  usuario!: UsuarioEntity;

  @ManyToOne(() => SitioEntity, (sitio) => sitio.movimientos)
  @JoinColumn({ name: 'sitio_id' })
  sitio!: SitioEntity;

  @OneToOne(() => DevolucionEntity, (devolucion) => devolucion.movimiento, { nullable: true })
  devolucion!: DevolucionEntity;
}
