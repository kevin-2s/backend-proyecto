import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { UsuarioOrmEntity } from '../../../usuarios/infrastructure/entities/usuario.orm-entity';
import { CentroOrmEntity } from '../../../centros/infrastructure/entities/centro.orm-entity';
import { TipoSitio } from '../../domain/entities/sitio.domain.entity';

@Entity('sitio')
export class SitioOrmEntity {
  @PrimaryGeneratedColumn()
  id_sitio: number;

  @Column({ type: 'varchar', length: 150 })
  nombre: string;

  @Column({ type: 'varchar', length: 50 })
  tipo: string;

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
