import { Categoria } from '../../entities/categoria.entity';

export interface CreateCategoriaCommand {
    nombreCat: string;
}

export interface CreateCategoriaUseCase {
    create(command: CreateCategoriaCommand): Promise<Categoria>;
}
