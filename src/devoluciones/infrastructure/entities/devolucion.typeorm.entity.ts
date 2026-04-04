import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('devoluciones')
export class DevolucionEntity {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ type: 'varchar' })
    asignacionId!: string;

    @Column({ type: 'int' })
    cantidadDevuelta!: number;

    @Column({ type: 'varchar' })
    estadoFisico!: string;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}
