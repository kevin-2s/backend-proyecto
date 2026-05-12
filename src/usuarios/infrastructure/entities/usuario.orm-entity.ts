import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { RolOrmEntity } from '../../../roles/infrastructure/entities/rol.orm-entity';

@Entity('usuario')
export class UsuarioOrmEntity {
  @PrimaryGeneratedColumn()
  id_usuario: number;

  @Column({ type: 'varchar', length: 150 })
  nombre: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  correo: string;

  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'boolean', default: true })
  estado: boolean;

  @Column()
  id_rol: number;

  @ManyToOne(() => RolOrmEntity)
  @JoinColumn({ name: 'id_rol' })
  rol: RolOrmEntity;
}
