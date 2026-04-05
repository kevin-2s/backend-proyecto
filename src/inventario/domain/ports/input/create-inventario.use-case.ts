import { Inventario } from '../../entities/inventario.entity';

export interface CreateInventarioCommand {
    cantidadActual: number;
    stockMinimo: number;
    productoId: number;
    sitioId: number;
}

export interface CreateInventarioUseCase {
    create(command: CreateInventarioCommand): Promise<Inventario>;
}
