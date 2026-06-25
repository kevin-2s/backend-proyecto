export class TrasladoNotFoundException extends Error {
  constructor(id: number) {
    super(`El traslado con id ${id} no fue encontrado`);
    this.name = 'TrasladoNotFoundException';
  }
}
