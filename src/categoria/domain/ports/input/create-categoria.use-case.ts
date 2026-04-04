import { Categoria } from '../../entities/categoria.entity';

export interface CreateCategoriaCommand {
    nombre: string;
    descripcion: string;
}

export interface CreateCategoriaUseCase {
    create(command: CreateCategoriaCommand): Promise<Categoria>;
}
