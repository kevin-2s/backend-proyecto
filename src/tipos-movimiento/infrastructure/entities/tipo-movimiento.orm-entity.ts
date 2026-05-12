import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('tipo_movimiento')
export class TipoMovimientoOrmEntity {
  @PrimaryGeneratedColumn()
  id_tipo_movimiento: number;

  @Column({ type: 'varchar', length: 100, unique: true })
  nombre: string;
}
