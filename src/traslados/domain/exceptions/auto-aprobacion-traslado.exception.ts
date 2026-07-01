export class AutoAprobacionTrasladoForbiddenException extends Error {
  constructor() {
    super('No puedes aprobar o rechazar un traslado que tú mismo solicitaste');
    this.name = 'AutoAprobacionTrasladoForbiddenException';
  }
}
