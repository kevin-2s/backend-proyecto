import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { UsuarioPermisoOrmEntity } from '../../../usuario-permisos/infrastructure/entities/usuario-permiso.orm-entity';

@Entity('permisos')
export class PermisoOrmEntity {
  @PrimaryGeneratedColumn()
  id_permiso: number;

  @Column({ type: 'varchar', length: 100, unique: true })
  nombre: string;

  @Column({ type: 'text' })
  descripcion: string;

  @Column({ type: 'varchar', length: 100 })
  modulo: string;

  @Column({ type: 'boolean', default: true })
  activo: boolean;

  @OneToMany(() => UsuarioPermisoOrmEntity, (up) => up.permiso)
  usuarioPermisos: UsuarioPermisoOrmEntity[];
}
