import { Sitio } from '../../entities/sitio.entity';

export interface CreateSitioCommand {
    nombreSitio: string;
    tipo: import('../../../../shared/domain/enums').TipoSitio;
    responsableId: number;
}

export interface CreateSitioUseCase {
    create(command: CreateSitioCommand): Promise<Sitio>;
}
