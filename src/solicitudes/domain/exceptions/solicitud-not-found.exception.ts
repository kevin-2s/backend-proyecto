export class SolicitudNotFoundException extends Error {
  constructor(id: number) {
    super(`La solicitud con id ${id} no fue encontrada`);
    this.name = 'SolicitudNotFoundException';
  }
}
