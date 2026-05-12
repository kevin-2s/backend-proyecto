import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('categoria')
export class CategoriaOrmEntity {
  @PrimaryGeneratedColumn()
  id_categoria: number;

  @Column({ type: 'varchar', length: 150, unique: true })
  nombre: string;
}
