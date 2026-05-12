export class ActaNotFoundException extends Error {
  constructor(id: number) {
    super(`El acta con id ${id} no fue encontrada`);
    this.name = 'ActaNotFoundException';
  }
}
