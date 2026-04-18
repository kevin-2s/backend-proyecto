import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { UsuarioOrmEntity } from '../../../usuarios/infrastructure/entities/usuario.orm-entity';

@Entity('chequeo')
export class ChequeoOrmEntity {
  @PrimaryGeneratedColumn()
  id_chequeo: number;

  @Column({ type: 'text' })
  observacion: string;

  @Column({ type: 'timestamp' })
  fecha: Date;

  @Column()
  id_usuario: number;

  @ManyToOne(() => UsuarioOrmEntity)
  @JoinColumn({ name: 'id_usuario' })
  usuario: UsuarioOrmEntity;
}
