import { Injectable, Inject } from '@nestjs/common';
import { IDetalleSolicitudUseCases } from '../../domain/ports/input/detalle-solicitud-use-cases.interface';
import { IDetalleSolicitudRepository, DETALLE_SOLICITUD_REPOSITORY } from '../../domain/ports/output/detalle-solicitud-repository.interface';
import { DetalleSolicitud } from '../../domain/entities/detalle-solicitud.domain.entity';

@Injectable()
export class DetalleSolicitudService implements IDetalleSolicitudUseCases {
  constructor(
    @Inject(DETALLE_SOLICITUD_REPOSITORY)
    private readonly repository: IDetalleSolicitudRepository,
  ) {}

  async obtenerDetalles(): Promise<DetalleSolicitud[]> {
    return this.repository.findAll();
  }

  async crearDetalle(data: { cantidad: number; id_solicitud: number; id_producto: number }): Promise<DetalleSolicitud> {
    return this.repository.create(data);
  }
}
