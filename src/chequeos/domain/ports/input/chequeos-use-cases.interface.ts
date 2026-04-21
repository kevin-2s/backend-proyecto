import { Chequeo } from "../../entities/chequeo.domain.entity";

export const CHEQUEOS_USE_CASES = Symbol("CHEQUEOS_USE_CASES");

export interface IChequeosUseCases {
  obtenerChequeos(): Promise<Chequeo[]>;
  obtenerChequeoPorId(id: number): Promise<Chequeo>;
  crearChequeo(data: {
    id_usuario: number;
    id_solicitud: number;
  }): Promise<Chequeo>;
}
