import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { TipoSitio } from '../../../shared/domain/enums';
import { UsuarioEntity } from '../../../users/infrastructure/entities/usuario.typeorm.entity';
import { InventarioEntity } from '../../../inventario/infrastructure/entities/inventario.typeorm.entity';
import { MovimientoEntity } from '../../../movimientos/infrastructure/entities/movimiento.typeorm.entity';

@Entity('sitios')
export class SitioEntity {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @Column({ name: 'nombre_sitio', type: 'varchar' })
  nombreSitio!: string;

  @Column({ name: 'tipo', type: 'enum', enum: TipoSitio })
  tipo!: TipoSitio;

  @ManyToOne(() => UsuarioEntity, (usuario) => usuario.sitiosResponsable)
  @JoinColumn({ name: 'responsable_id' })
  responsable!: UsuarioEntity;

  @OneToMany(() => InventarioEntity, (inventario) => inventario.sitio)
  inventarios!: InventarioEntity[];

  @OneToMany(() => MovimientoEntity, (movimiento) => movimiento.sitio)
  movimientos!: MovimientoEntity[];
}
