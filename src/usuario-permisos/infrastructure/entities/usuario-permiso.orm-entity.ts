import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { PermisoOrmEntity } from '../../../permisos/infrastructure/entities/permiso.orm-entity';
import { UsuarioOrmEntity } from '../../../usuarios/infrastructure/entities/usuario.orm-entity';

@Entity('usuario_permisos')
export class UsuarioPermisoOrmEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  id_usuario: number;

  @Column()
  id_permiso: number;

  @Column({ type: 'boolean', default: true })
  activo: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  fecha_asignacion: Date;

  @ManyToOne(() => UsuarioOrmEntity)
  @JoinColumn({ name: 'id_usuario' })
  usuario: UsuarioOrmEntity;

  @ManyToOne(() => PermisoOrmEntity, (permiso) => permiso.usuarioPermisos)
  @JoinColumn({ name: 'id_permiso' })
  permiso: PermisoOrmEntity;
}
