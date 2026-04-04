import { Ficha } from '../../entities/ficha.entity';

export interface CreateFichaCommand {
    codigo: string;
    programa: string;
    estado: string;
}

export interface CreateFichaUseCase {
    create(command: CreateFichaCommand): Promise<Ficha>;
}
