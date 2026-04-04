import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('movimientos')
export class MovimientoEntity {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ type: 'varchar' })
    tipoMovimiento!: string;

    @Column({ type: 'varchar' })
    productoId!: string;

    @Column({ type: 'int' })
    cantidad!: number;

    @Column({ type: 'varchar' })
    sitioOrigenId!: string;

    @Column({ type: 'varchar' })
    sitioDestinoId!: string;

    @Column({ type: 'varchar' })
    usuarioId!: string;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}
