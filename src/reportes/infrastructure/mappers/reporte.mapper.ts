import { Reporte } from '../../domain/entities/reporte.entity';
import { ReporteEntity } from '../entities/reporte.typeorm.entity';

export class ReporteMapper {
    static toDomain(entity: ReporteEntity): Reporte {
        return new Reporte(
            entity.id,
            entity.tipoReporte,
            entity.parametros,
            entity.urlGenerado,
            entity.createdAt,
            entity.updatedAt
        );
    }

    static toEntity(domain: Reporte): ReporteEntity {
        const entity = new ReporteEntity();
        if (domain.id) entity.id = domain.id;
        entity.tipoReporte = domain.tipoReporte;
        entity.parametros = domain.parametros;
        entity.urlGenerado = domain.urlGenerado;
        return entity;
    }
}
