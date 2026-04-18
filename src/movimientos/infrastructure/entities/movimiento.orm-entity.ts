import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { ItemOrmEntity } from '../../../items/infrastructure/entities/item.orm-entity';
import { TipoMovimientoOrmEntity } from '../../../tipos-movimiento/infrastructure/entities/tipo-movimiento.orm-entity';
import { UsuarioOrmEntity } from '../../../usuarios/infrastructure/entities/usuario.orm-entity';

@Entity('movimiento')
export class MovimientoOrmEntity {
  @PrimaryGeneratedColumn()
  id_movimiento: number;

  @Column({ type: 'timestamp' })
  fecha: Date;

  @Column({ type: 'text', nullable: true })
  observacion: string | null;

  @Column()
  id_item: number;

  @Column()
  id_tipo_movimiento: number;

  @Column()
  id_usuario: number;

  @ManyToOne(() => ItemOrmEntity)
  @JoinColumn({ name: 'id_item' })
  item: ItemOrmEntity;

  @ManyToOne(() => TipoMovimientoOrmEntity)
  @JoinColumn({ name: 'id_tipo_movimiento' })
  tipoMovimiento: TipoMovimientoOrmEntity;

  @ManyToOne(() => UsuarioOrmEntity)
  @JoinColumn({ name: 'id_usuario' })
  usuario: UsuarioOrmEntity;
}
