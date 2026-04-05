import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { UsuarioEntity } from '../../../users/infrastructure/entities/usuario.typeorm.entity';
import { ProductoEntity } from '../../../productos/infrastructure/entities/producto.typeorm.entity';
import { FichaEntity } from '../../../fichas/infrastructure/entities/ficha.typeorm.entity';

@Entity('necesidades')
export class NecesidadEntity {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @Column({ name: 'cantidad_n', type: 'int' })
  cantidadN!: number;

  @Column({ name: 'fecha_limite', type: 'timestamp with time zone', nullable: true })
  fechaLimite!: Date;

  @ManyToOne(() => UsuarioEntity, (usuario) => usuario.necesidades)
  @JoinColumn({ name: 'usuario_id' })
  usuario!: UsuarioEntity;

  @ManyToOne(() => ProductoEntity, (producto) => producto.necesidades)
  @JoinColumn({ name: 'producto_id' })
  producto!: ProductoEntity;

  @ManyToOne(() => FichaEntity, (ficha) => ficha.necesidades)
  @JoinColumn({ name: 'ficha_id' })
  ficha!: FichaEntity;
}
