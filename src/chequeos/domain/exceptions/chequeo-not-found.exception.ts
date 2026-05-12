export class ChequeoNotFoundException extends Error {
  constructor(id: number) {
    super(`El chequeo con id ${id} no fue encontrado`);
    this.name = 'ChequeoNotFoundException';
  }
}
