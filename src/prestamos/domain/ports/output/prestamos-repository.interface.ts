import { Prestamo } from '../../entities/prestamo.domain.entity';

export const PRESTAMOS_REPOSITORY = Symbol('PRESTAMOS_REPOSITORY');

export interface IPrestamosRepository {
  findAll(): Promise<Prestamo[]>;
  findById(id: number): Promise<Prestamo | null>;
  findActivos(): Promise<Prestamo[]>;
  create(data: Omit<Prestamo, 'id_prestamo'>): Promise<Prestamo>;
  update(id: number, data: Partial<Prestamo>): Promise<Prestamo>;
}
