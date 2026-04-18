import { Chequeo } from '../../entities/chequeo.domain.entity';

export const CHEQUEOS_USE_CASES = Symbol('CHEQUEOS_USE_CASES');

export interface IChequeosUseCases {
  obtenerChequeos(): Promise<Chequeo[]>;
  obtenerChequeoPorId(id: number): Promise<Chequeo>;
  crearChequeo(data: { observacion: string; id_usuario: number }): Promise<Chequeo>;
}
