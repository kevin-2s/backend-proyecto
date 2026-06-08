import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('area')
export class AreaOrmEntity {
  @PrimaryGeneratedColumn()
  id_area: number;

  @Column({ type: 'varchar', length: 150, unique: true })
  nombre: string;

  @Column({ type: 'boolean', default: true })
  estado: boolean;
}
