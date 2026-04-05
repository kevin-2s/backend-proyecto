import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToOne, JoinColumn } from 'typeorm';
import { AsignaEntity } from '../../../asignaciones/infrastructure/entities/asigna.typeorm.entity';
import { DevolucionEntity } from '../../../devoluciones/infrastructure/entities/devolucion.typeorm.entity';

@Entity('actas')
export class ActaEntity {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @CreateDateColumn({ name: 'fecha_gen', type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP' })
  fechaGen!: Date;

  @Column({ name: 'url_pdf', type: 'varchar', nullable: true })
  urlPdf!: string;

  @OneToOne(() => AsignaEntity, (asigna) => asigna.acta, { nullable: true })
  @JoinColumn({ name: 'asigna_id' })
  asigna!: AsignaEntity;

  @OneToOne(() => DevolucionEntity, (devolucion) => devolucion.acta, { nullable: true })
  @JoinColumn({ name: 'devolucion_id' })
  devolucion!: DevolucionEntity;
}
