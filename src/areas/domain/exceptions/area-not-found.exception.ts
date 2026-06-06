export class AreaNotFoundException extends Error {
  constructor(id: number) {
    super(`El área con id ${id} no fue encontrada`);
    this.name = 'AreaNotFoundException';
  }
}
