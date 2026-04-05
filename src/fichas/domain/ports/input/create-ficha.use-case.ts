import { Ficha } from '../../entities/ficha.entity';

export interface CreateFichaCommand {
    numeroFicha: string;
    programa: string;
}

export interface CreateFichaUseCase {
    create(command: CreateFichaCommand): Promise<Ficha>;
}
