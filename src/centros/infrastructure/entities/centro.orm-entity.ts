import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('centro')
export class CentroOrmEntity {
  @PrimaryGeneratedColumn()
  id_centro: number;

  @Column({ type: 'varchar', length: 150, unique: true })
  nombre: string;

  @Column({ type: 'varchar', length: 50, unique: true })
  codigo: string;

  @Column({ type: 'varchar', length: 100 })
  regional: string;

  @Column({ type: 'boolean', default: true })
  estado: boolean;
}
