import { Traslado } from '../../entities/traslado.domain.entity';

export const TRASLADOS_USE_CASES = Symbol('TRASLADOS_USE_CASES');

export interface ITrasladosUseCases {
  obtenerTraslados(): Promise<Traslado[]>;
  obtenerTrasladoPorId(id: number): Promise<Traslado>;
  crearTraslado(data: {
    id_item: number;
    id_sitio_destino: number;
    justificacion?: string | null;
    id_usuario_solicita: number;
  }): Promise<Traslado>;
  aprobarTraslado(id: number, id_usuario_aprueba: number): Promise<Traslado>;
  rechazarTraslado(id: number, id_usuario_aprueba: number, observacion_resolucion?: string | null): Promise<Traslado>;
}
