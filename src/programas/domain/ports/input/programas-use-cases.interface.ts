import { Programa } from '../../entities/programa.domain.entity';

export const PROGRAMAS_USE_CASES = Symbol('PROGRAMAS_USE_CASES');

export interface IProgramasUseCases {
  obtenerProgramas(): Promise<Programa[]>;
  obtenerProgramaPorId(id: number): Promise<Programa>;
  crearPrograma(data: { codigo: string; nombre: string; id_area: number; estado?: boolean }): Promise<Programa>;
  actualizarPrograma(id: number, data: Partial<Programa>): Promise<Programa>;
  eliminarPrograma(id: number): Promise<void>;
}
