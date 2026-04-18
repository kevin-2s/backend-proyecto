import { Ficha } from '../../entities/ficha.domain.entity';

export const FICHAS_USE_CASES = Symbol('FICHAS_USE_CASES');

export interface IFichasUseCases {
  obtenerFichas(): Promise<Ficha[]>;
  obtenerFichaPorId(id: number): Promise<Ficha>;
  crearFicha(data: { numero_ficha: string; programa: string; id_responsable?: number | null }): Promise<Ficha>;
}
