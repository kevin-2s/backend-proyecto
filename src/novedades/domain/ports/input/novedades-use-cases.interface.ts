import { Novedad } from '../../entities/novedad.domain.entity';

export const NOVEDADES_USE_CASES = Symbol('NOVEDADES_USE_CASES');

export interface INovedadesUseCases {
  obtenerNovedades(): Promise<Novedad[]>;
  obtenerNovedadesPorItem(id_item: number): Promise<Novedad[]>;
  obtenerNovedadPorId(id: number): Promise<Novedad>;
  crearNovedad(data: {
    tipo: string;
    descripcion: string;
    id_usuario: number;
    id_item?: number | null;
    estado?: string;
  }, requestingUserId?: number, requestingRole?: string): Promise<Novedad>;
  actualizarEstado(id: number, estado: string, requestingUserId?: number, requestingRole?: string): Promise<Novedad>;
  eliminarNovedad(id: number): Promise<void>;
}
