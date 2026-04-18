import { Devolucion } from '../../entities/devolucion.domain.entity';

export const DEVOLUCIONES_USE_CASES = Symbol('DEVOLUCIONES_USE_CASES');

export interface IDevolucionesUseCases {
  obtenerDevoluciones(): Promise<Devolucion[]>;
  obtenerDevolucionPorId(id: number): Promise<Devolucion>;
  crearDevolucion(data: { id_solicitud: number; id_usuario_recibe: number }): Promise<Devolucion>;
}
