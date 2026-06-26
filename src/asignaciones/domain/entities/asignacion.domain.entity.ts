import { Producto } from '../../../productos/domain/entities/producto.domain.entity';
import { Ficha } from '../../../fichas/domain/entities/ficha.domain.entity';
import { Usuario } from '../../../usuarios/domain/entities/usuario.domain.entity';

export enum EstadoAsignacion {
  ACTIVA = 'ACTIVA',
  ANULADA = 'ANULADA',
}

export class Asignacion {
  constructor(
    public readonly id_asignacion: number,
    public id_ficha: number,
    public id_producto: number,
    public cantidad: number,
    public fecha_asignacion: Date,
    public id_usuario_asigna: number,
    public observacion: string | null,
    public estado: string,
    public ficha?: Ficha,
    public producto?: Producto,
    public usuario_asigna?: Usuario,
  ) {}
}
