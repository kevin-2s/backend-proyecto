import { Asignacion } from '../../entities/asignacion.domain.entity';

export const ASIGNACIONES_USE_CASES = Symbol('ASIGNACIONES_USE_CASES');

export interface IAsignacionesUseCases {
  obtenerAsignaciones(): Promise<Asignacion[]>;
  obtenerAsignacionPorId(id: number): Promise<Asignacion>;
  crearAsignacion(data: {
    id_ficha: number;
    id_producto: number;
    cantidad: number;
    id_usuario_asigna: number;
    observacion?: string | null;
  }): Promise<Asignacion>;
  anularAsignacion(id: number): Promise<Asignacion>;
  agregarItemAAsignacion(id_asignacion: number, id_item: number): Promise<Asignacion>;
  eliminarAsignacion(id: number): Promise<void>;
}
