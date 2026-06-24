import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { RolOrmEntity } from '../../../roles/infrastructure/entities/rol.orm-entity';
import { TenantOrmEntity } from '../../../shared/tenancy/tenant.orm-entity';

@Entity('usuario')
export class UsuarioOrmEntity extends TenantOrmEntity {
  @PrimaryGeneratedColumn()
  id_usuario: number;

  @Column({ type: 'varchar', length: 150 })
  nombre: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  correo: string;

  @Column({ type: 'varchar', length: 30, nullable: true })
  telefono?: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  documento?: string;

  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'boolean', default: true })
  estado: boolean;

  @Column()
  id_rol: number;

  @ManyToOne(() => RolOrmEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id_rol' })
  rol: RolOrmEntity;
}
