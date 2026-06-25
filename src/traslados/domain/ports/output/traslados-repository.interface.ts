import { Traslado } from '../../entities/traslado.domain.entity';

export const TRASLADOS_REPOSITORY = Symbol('TRASLADOS_REPOSITORY');

export interface ITrasladosRepository {
  findAll(): Promise<Traslado[]>;
  findById(id: number): Promise<Traslado | null>;
  findPendienteByItem(id_item: number): Promise<Traslado | null>;
  create(traslado: Omit<Traslado, 'id_traslado' | 'item' | 'sitio_origen' | 'sitio_destino' | 'usuario_solicita' | 'usuario_aprueba'>): Promise<Traslado>;
  update(id: number, traslado: Partial<Traslado>): Promise<Traslado>;
  obtenerUbicacionActualDeItem(id_item: number): Promise<{ id_sitio: number | null; estado: string; descripcion: string } | null>;
  obtenerResponsableDeSitio(id_sitio: number): Promise<{ id_responsable: number; nombre_sitio: string } | null>;
  moverItem(id_item: number, id_sitio_destino: number): Promise<void>;
}
