import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { AsignaEntity } from '../../../asignaciones/infrastructure/entities/asigna.typeorm.entity';
import { NecesidadEntity } from '../../../necesidades/infrastructure/entities/necesidad.typeorm.entity';

@Entity('fichas')
export class FichaEntity {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @Column({ name: 'numero_ficha', type: 'varchar', unique: true })
  numeroFicha!: string;

  @Column({ name: 'programa', type: 'varchar' })
  programa!: string;

  @OneToMany(() => AsignaEntity, (asigna) => asigna.ficha)
  asignaciones!: AsignaEntity[];

  @OneToMany(() => NecesidadEntity, (necesidad) => necesidad.ficha)
  necesidades!: NecesidadEntity[];
}
