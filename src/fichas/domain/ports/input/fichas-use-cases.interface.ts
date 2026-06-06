import { Ficha } from '../../entities/ficha.domain.entity';

export const FICHAS_USE_CASES = Symbol('FICHAS_USE_CASES');

export interface IFichasUseCases {
  obtenerFichas(): Promise<Ficha[]>;
  obtenerFichaPorId(id: number): Promise<Ficha>;
  crearFicha(data: { numero_ficha: string; id_programa: number; id_responsable: number; ambiente?: string }): Promise<Ficha>;
  actualizarFicha(id: number, data: any): Promise<Ficha>;
  eliminarFicha(id: number): Promise<void>;
}
