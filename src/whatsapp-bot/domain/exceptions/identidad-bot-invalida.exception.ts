export class IdentidadBotInvalidaForbiddenException extends Error {
  constructor() {
    super(
      'No se pudo verificar tu identidad. Verifica tu nombre, tu número de cédula y que estés escribiendo desde el número de WhatsApp registrado en el sistema.',
    );
    this.name = 'IdentidadBotInvalidaForbiddenException';
  }
}
