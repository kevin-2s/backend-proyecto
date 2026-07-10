export class SoloResponsablePuedeAprobarSolicitudForbiddenException extends Error {
  constructor() {
    super('Solo el responsable de la bodega puede aprobar o rechazar esta solicitud');
    this.name = 'SoloResponsablePuedeAprobarSolicitudForbiddenException';
  }
}
