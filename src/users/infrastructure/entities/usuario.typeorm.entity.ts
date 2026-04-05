import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { RoleEntity } from '../../../roles/infrastructure/entities/role.typeorm.entity';
import { SitioEntity } from '../../../sitios/infrastructure/entities/sitio.typeorm.entity';
import { SolicitudEntity } from '../../../solicitudes/infrastructure/entities/solicitud.typeorm.entity';
import { AsignaEntity } from '../../../asignaciones/infrastructure/entities/asigna.typeorm.entity';
import { MovimientoEntity } from '../../../movimientos/infrastructure/entities/movimiento.typeorm.entity';
import { NecesidadEntity } from '../../../necesidades/infrastructure/entities/necesidad.typeorm.entity';
import { NotificacionEntity } from '../../../notificaciones/infrastructure/entities/notificacion.typeorm.entity';
import { ChequeoEntity } from '../../../chequeo/infrastructure/entities/chequeo.typeorm.entity';

@Entity('usuarios')
export class UsuarioEntity {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @Column({ name: 'nombre_completo', type: 'varchar' })
  nombreCompleto!: string;

  @Column({ name: 'correo', type: 'varchar', unique: true })
  correo!: string;

  @Column({ name: 'contrasena', type: 'varchar' })
  contrasena!: string;

  @Column({ name: 'estado', type: 'boolean', default: true })
  estado!: boolean;

  @ManyToOne(() => RoleEntity, (rol) => rol.usuarios)
  @JoinColumn({ name: 'rol_id' })
  rol!: RoleEntity;

  @OneToMany(() => SitioEntity, (sitio) => sitio.responsable)
  sitiosResponsable!: SitioEntity[];

  @OneToMany(() => SolicitudEntity, (solicitud) => solicitud.usuario)
  solicitudes!: SolicitudEntity[];

  @OneToMany(() => SolicitudEntity, (solicitud) => solicitud.usuarioResponde)
  solicitudesRespondidas!: SolicitudEntity[];

  @OneToMany(() => AsignaEntity, (asigna) => asigna.usuario)
  asignaciones!: AsignaEntity[];

  @OneToMany(() => MovimientoEntity, (movimiento) => movimiento.usuario)
  movimientos!: MovimientoEntity[];

  @OneToMany(() => NecesidadEntity, (necesidad) => necesidad.usuario)
  necesidades!: NecesidadEntity[];

  @OneToMany(() => NotificacionEntity, (notificacion) => notificacion.usuario)
  notificaciones!: NotificacionEntity[];

  @OneToMany(() => ChequeoEntity, (chequeo) => chequeo.usuario)
  chequeos!: ChequeoEntity[];
}
