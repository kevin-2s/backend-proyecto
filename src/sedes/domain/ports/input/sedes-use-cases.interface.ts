import { Sede } from '../../entities/sede.domain.entity';

export const SEDES_USE_CASES = Symbol('SEDES_USE_CASES');

export interface ISedesUseCases {
  obtenerSedes(): Promise<Sede[]>;
  obtenerSedePorId(id: number): Promise<Sede>;
  crearSede(data: { nombre: string; direccion: string; id_centro: number; estado?: boolean }): Promise<Sede>;
  actualizarSede(id: number, data: Partial<Sede>): Promise<Sede>;
  eliminarSede(id: number): Promise<void>;
}
