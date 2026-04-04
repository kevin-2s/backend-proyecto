import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('actas')
export class ActaEntity {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ type: 'varchar' })
    movimientoId!: string;

    @Column({ type: 'varchar' })
    tipoActa!: string;

    @Column({ type: 'varchar' })
    urlPdf!: string;

    @Column({ type: 'varchar' })
    generadoPor!: string;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}
