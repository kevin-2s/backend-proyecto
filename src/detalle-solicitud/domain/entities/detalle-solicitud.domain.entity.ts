import { Solicitud } from '../../../solicitudes/domain/entities/solicitud.domain.entity';
import { Producto } from '../../../productos/domain/entities/producto.domain.entity';

export class DetalleSolicitud {
  constructor(
    public readonly id_detalle: number,
    public cantidad: number,
    public id_solicitud: number,
    public id_producto: number,
    public solicitud?: Solicitud,
    public producto?: Producto,
  ) {}
}
