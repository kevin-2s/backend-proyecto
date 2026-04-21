import { Acta } from "../../entities/acta.domain.entity";

export const ACTAS_USE_CASES = Symbol("ACTAS_USE_CASES");

export interface IActasUseCases {
  obtenerActas(): Promise<Acta[]>;
  obtenerActaPorId(id: number): Promise<Acta>;
  crearActa(data: {
    url_pdf: string;
    id_solicitud: number;
    id_usuario: number;
  }): Promise<Acta>;
}
