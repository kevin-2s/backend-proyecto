import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('centro')
export class CentroOrmEntity {
  @PrimaryGeneratedColumn()
  id_centro: number;

  @Column({ type: 'varchar', length: 150 })
  nombre: string;

  @Column({ type: 'boolean', default: true })
  estado: boolean;
}
