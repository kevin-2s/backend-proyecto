import { Sitio } from '../../entities/sitio.entity';

export interface CreateSitioCommand {
    nombre: string;
    tipoSitio: string;
    capacidad: number;
}

export interface CreateSitioUseCase {
    create(command: CreateSitioCommand): Promise<Sitio>;
}
