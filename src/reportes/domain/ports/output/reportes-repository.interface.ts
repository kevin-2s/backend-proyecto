export const REPORTES_REPOSITORY = Symbol('REPORTES_REPOSITORY');

export interface ReportesRepository {
  obtenerInventario(): Promise<any[]>; // TODO: definir entidad
  obtenerSolicitudes(): Promise<any[]>;
  obtenerPrestamos(): Promise<any[]>;
  obtenerKardex(): Promise<any[]>;
  obtenerUsuarios(): Promise<any[]>;
}
