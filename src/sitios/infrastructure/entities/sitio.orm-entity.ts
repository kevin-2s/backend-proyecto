import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { UsuarioOrmEntity } from '../../../usuarios/infrastructure/entities/usuario.orm-entity';
import { TipoSitio } from '../../domain/entities/sitio.domain.entity';

@Entity('sitio')
export class SitioOrmEntity {
  @PrimaryGeneratedColumn()
  id_sitio: number;

  @Column({ type: 'varchar', length: 150 })
  nombre: string;

  @Column({ type: 'enum', enum: TipoSitio })
  tipo: TipoSitio;

  @Column({ nullable: true })
  id_responsable: number;

  @ManyToOne(() => UsuarioOrmEntity, { nullable: true })
  @JoinColumn({ name: 'id_responsable' })
  responsable: UsuarioOrmEntity;
}
