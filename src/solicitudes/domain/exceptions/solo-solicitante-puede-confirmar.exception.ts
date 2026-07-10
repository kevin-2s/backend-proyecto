export class SoloSolicitantePuedeConfirmarForbiddenException extends Error {
  constructor() {
    super('Solo el solicitante original puede confirmar la recepción de esta solicitud');
    this.name = 'SoloSolicitantePuedeConfirmarForbiddenException';
  }
}
