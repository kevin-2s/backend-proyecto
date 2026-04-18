import { Acta, TipoActa } from '../../entities/acta.domain.entity';

export const ACTAS_USE_CASES = Symbol('ACTAS_USE_CASES');

export interface IActasUseCases {
  obtenerActas(): Promise<Acta[]>;
  obtenerActaPorId(id: number): Promise<Acta>;
  crearActa(data: {
    tipo: TipoActa;
    archivo_url: string;
    id_solicitud?: number | null;
    id_devolucion?: number | null;
  }): Promise<Acta>;
}
