import { Inventario } from '../../entities/inventario.entity';

export interface CreateInventarioCommand {
    productoId: string;
    sitioId: string;
    cantidad: number;
}

export interface CreateInventarioUseCase {
    create(command: CreateInventarioCommand): Promise<Inventario>;
}
