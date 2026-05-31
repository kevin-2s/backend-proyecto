import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { RolOrmEntity } from './rol.orm-entity';
import { PermisoOrmEntity } from '../../../permisos/infrastructure/entities/permiso.orm-entity';

@Entity('rol_permisos')
export class RolPermisoOrmEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  id_rol: number;

  @Column()
  id_permiso: number;

  @ManyToOne(() => RolOrmEntity)
  @JoinColumn({ name: 'id_rol' })
  rol: RolOrmEntity;

  @ManyToOne(() => PermisoOrmEntity)
  @JoinColumn({ name: 'id_permiso' })
  permiso: PermisoOrmEntity;
}