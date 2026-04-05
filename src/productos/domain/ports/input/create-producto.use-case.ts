import { Producto } from '../../entities/producto.entity';

export interface CreateProductoCommand {
    nombre: string;
    descripcion?: string;
    codigoUNSPSC?: string;
    SKU: string;
    imagenUrl?: string;
    categoriaId: number;
}

export interface CreateProductoUseCase {
    create(command: CreateProductoCommand): Promise<Producto>;
}
