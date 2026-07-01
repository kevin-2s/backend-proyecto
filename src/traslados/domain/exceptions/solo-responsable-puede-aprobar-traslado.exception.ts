export class SoloResponsablePuedeAprobarTrasladoForbiddenException extends Error {
  constructor() {
    super('Solo el responsable del lugar de origen puede aprobar o rechazar este traslado');
    this.name = 'SoloResponsablePuedeAprobarTrasladoForbiddenException';
  }
}
