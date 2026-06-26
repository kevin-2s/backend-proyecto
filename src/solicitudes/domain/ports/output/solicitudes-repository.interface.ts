import { Solicitud } from '../../entities/solicitud.domain.entity';

export const SOLICITUDES_REPOSITORY = Symbol('SOLICITUDES_REPOSITORY');

export interface ISolicitudesRepository {
  findAll(): Promise<Solicitud[]>;
  findById(id: number): Promise<Solicitud | null>;
  create(solicitud: Omit<Solicitud, 'id_solicitud' | 'usuario' | 'usuario_aprueba' | 'ficha' | 'producto'>): Promise<Solicitud>;
  update(id: number, solicitud: Partial<Solicitud>): Promise<Solicitud>;
  getResponsableForProducto(id_producto: number): Promise<{ id_responsable: number; nombre_producto: string; nombre_bodega: string } | null>;
  marcarEntregada(id: number): Promise<Solicitud>;
}
