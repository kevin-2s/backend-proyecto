import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn, OneToOne, OneToMany } from 'typeorm';
import { AsignaEntity } from '../../../asignaciones/infrastructure/entities/asigna.typeorm.entity';
import { DevolucionEntity } from '../../../devoluciones/infrastructure/entities/devolucion.typeorm.entity';
import { UsuarioEntity } from '../../../users/infrastructure/entities/usuario.typeorm.entity';
import { ItemChequeoEntity } from './item-chequeo.typeorm.entity';

@Entity('chequeos')
export class ChequeoEntity {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @CreateDateColumn({ name: 'fecha_chequeo', type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP' })
  fechaChequeo!: Date;

  @Column({ name: 'confirmado', type: 'boolean', default: false })
  confirmado!: boolean;

  @OneToOne(() => AsignaEntity, (asigna) => asigna.chequeo, { nullable: true })
  @JoinColumn({ name: 'asigna_id' })
  asigna!: AsignaEntity;

  @OneToOne(() => DevolucionEntity, (devolucion) => devolucion.chequeo, { nullable: true })
  @JoinColumn({ name: 'devolucion_id' })
  devolucion!: DevolucionEntity;

  @ManyToOne(() => UsuarioEntity, (usuario) => usuario.chequeos)
  @JoinColumn({ name: 'usuario_id' })
  usuario!: UsuarioEntity;

  @OneToMany(() => ItemChequeoEntity, (item) => item.chequeo)
  items!: ItemChequeoEntity[];
}
