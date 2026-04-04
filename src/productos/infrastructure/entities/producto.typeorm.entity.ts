import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('productos')
export class ProductoEntity {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ type: 'varchar' })
    nombre!: string;

    @Column({ type: 'varchar' })
    descripcion!: string;

    @Column({ type: 'varchar' })
    categoriaId!: string;

    @Column({ type: 'int' })
    stockMinimo!: number;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}
