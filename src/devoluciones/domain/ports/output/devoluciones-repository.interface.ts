import { Devolucion } from '../../entities/devolucion.domain.entity';

export const DEVOLUCIONES_REPOSITORY = Symbol('DEVOLUCIONES_REPOSITORY');

export interface IDevolucionesRepository {
  findAll(): Promise<Devolucion[]>;
  findById(id: number): Promise<Devolucion | null>;
  create(devolucion: Omit<Devolucion, 'id_devolucion' | 'solicitud' | 'usuario_recibe'>): Promise<Devolucion>;
}
