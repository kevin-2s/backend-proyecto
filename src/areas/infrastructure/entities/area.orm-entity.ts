import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { SitioOrmEntity } from '../../../sitios/infrastructure/entities/sitio.orm-entity';

@Entity('area')
export class AreaOrmEntity {
  @PrimaryGeneratedColumn()
  id_area: number;

  @Column({ type: 'varchar', length: 150 })
  nombre: string;

  @Column({ nullable: false })
  id_sitio: number;

  @ManyToOne(() => SitioOrmEntity, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id_sitio' })
  sitio: SitioOrmEntity;

  @Column({ type: 'boolean', default: true })
  estado: boolean;
}
