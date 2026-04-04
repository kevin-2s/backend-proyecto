import { Reporte } from '../../entities/reporte.entity';

export interface CreateReporteCommand {
    tipoReporte: string;
    parametros: string;
    urlGenerado: string;
}

export interface CreateReporteUseCase {
    create(command: CreateReporteCommand): Promise<Reporte>;
}
