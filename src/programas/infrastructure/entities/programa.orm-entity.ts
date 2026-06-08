import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { AreaOrmEntity } from '../../../areas/infrastructure/entities/area.orm-entity';

@Entity('programa')
export class ProgramaOrmEntity {
  @PrimaryGeneratedColumn()
  id_programa: number;

  @Column({ type: 'varchar', length: 150 })
  nombre: string;

  @Column({ type: 'varchar', length: 50, unique: true })
  codigo: string;

  @Column({ name: 'id_area' })
  id_area: number;

  @Column({ type: 'boolean', default: true })
  estado: boolean;

  @ManyToOne(() => AreaOrmEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id_area' })
  area: AreaOrmEntity;
}
