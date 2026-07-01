export class AutoAprobacionSolicitudForbiddenException extends Error {
  constructor() {
    super('No puedes aprobar o rechazar una solicitud que tú mismo creaste');
    this.name = 'AutoAprobacionSolicitudForbiddenException';
  }
}
