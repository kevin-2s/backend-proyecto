import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { CentroOrmEntity } from '../../../centros/infrastructure/entities/centro.orm-entity';

@Entity('sede')
export class SedeOrmEntity {
  @PrimaryGeneratedColumn()
  id_sede: number;

  @Column({ type: 'varchar', length: 150 })
  nombre: string;

  @Column({ type: 'varchar', length: 250 })
  direccion: string;

  @Column({ name: 'id_centro' })
  id_centro: number;

  @Column({ type: 'boolean', default: true })
  estado: boolean;

  @ManyToOne(() => CentroOrmEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id_centro' })
  centro: CentroOrmEntity;
}
