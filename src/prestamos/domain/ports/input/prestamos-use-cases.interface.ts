import { Prestamo } from '../../entities/prestamo.domain.entity';

export const PRESTAMOS_USE_CASES = Symbol('PRESTAMOS_USE_CASES');

export interface IPrestamosUseCases {
  obtenerTodos(): Promise<Prestamo[]>;
  obtenerActivos(): Promise<Prestamo[]>;
  obtenerPorId(id: number): Promise<Prestamo | null>;
  crearPrestamo(data: {
    fecha_devolucion_esperada: Date;
    observacion?: string;
    id_item: number;
    id_usuario_solicitante: number;
    id_usuario_responsable: number;
  }): Promise<Prestamo>;
  registrarDevolucion(id: number, observacion?: string): Promise<Prestamo>;
}
