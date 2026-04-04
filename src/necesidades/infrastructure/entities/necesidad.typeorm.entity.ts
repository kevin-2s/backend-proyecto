import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('necesidades')
export class NecesidadEntity {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ type: 'varchar' })
    productoId!: string;

    @Column({ type: 'int' })
    cantidadNecesaria!: number;

    @Column({ type: 'varchar' })
    justificacion!: string;

    @Column({ type: 'varchar' })
    estado!: string;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}
