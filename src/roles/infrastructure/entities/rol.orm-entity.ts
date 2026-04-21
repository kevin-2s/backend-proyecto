import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('rol')
export class RolOrmEntity {
  @PrimaryGeneratedColumn()
  id_rol: number;

  @Column({ type: 'varchar', length: 100, unique: true })
  nombre: string;
}
