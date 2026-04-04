import { Producto } from '../../entities/producto.entity';

export interface CreateProductoCommand {
    nombre: string;
    descripcion: string;
    categoriaId: string;
    stockMinimo: number;
}

export interface CreateProductoUseCase {
    create(command: CreateProductoCommand): Promise<Producto>;
}
