import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('proveedores')
export class ProveedorOrmEntity {
  @PrimaryGeneratedColumn()
  id_proveedor: number;

  @Column({ type: 'varchar', length: 150 })
  nombre_empresa: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  nit: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  contacto: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  telefono: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  correo: string;

  @Column({ type: 'text', nullable: true })
  direccion: string;

  @Column({ type: 'boolean', default: true })
  estado: boolean;
}
