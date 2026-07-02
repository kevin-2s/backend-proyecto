import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { UsuarioOrmEntity } from '../../../usuarios/infrastructure/entities/usuario.orm-entity';
import { CentroOrmEntity } from '../../../centros/infrastructure/entities/centro.orm-entity';
import { TipoSitio } from '../../domain/entities/sitio.domain.entity';

import { TenantOrmEntity } from '../../../shared/tenancy/tenant.orm-entity';

@Entity('sitio')
export class SitioOrmEntity extends TenantOrmEntity {
  @PrimaryGeneratedColumn()
  id_sitio: number;

  @Column({ type: 'varchar', length: 150 })
  nombre: string;

  @Column({ type: 'varchar', length: 50 })
  tipo: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  tipo_personalizado: string | null;

  @Column({ type: 'varchar', length: 50, nullable: true })
  codigo_lugar: string | null;

  @Column({ nullable: true })
  id_responsable: number;

  @Column({ nullable: true })
  id_centro: number;

  @ManyToOne(() => UsuarioOrmEntity, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'id_responsable' })
  responsable: UsuarioOrmEntity;

  @ManyToOne(() => CentroOrmEntity, { nullable: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id_centro' })
  centro: CentroOrmEntity;

  @Column({ type: 'boolean', default: true })
  estado: boolean;
}
