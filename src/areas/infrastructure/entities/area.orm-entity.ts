import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, Unique } from 'typeorm';
import { SedeOrmEntity } from '../../../sedes/infrastructure/entities/sede.orm-entity';

@Entity('area')
@Unique(['nombre', 'id_sede'])
export class AreaOrmEntity {
  @PrimaryGeneratedColumn()
  id_area: number;

  @Column({ type: 'varchar', length: 150 })
  nombre: string;

  @Column({ name: 'id_sede', nullable: true })
  id_sede: number;

  @ManyToOne(() => SedeOrmEntity, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'id_sede' })
  sede: SedeOrmEntity;

  @Column({ type: 'boolean', default: true })
  estado: boolean;
}
