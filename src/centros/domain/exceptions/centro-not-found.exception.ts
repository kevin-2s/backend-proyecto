export class CentroNotFoundException extends Error {
  constructor(id: number) {
    super(`El centro con id ${id} no fue encontrado`);
    this.name = 'CentroNotFoundException';
  }
}
