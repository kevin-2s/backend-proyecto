export class SedeNotFoundException extends Error {
  constructor(id: number) {
    super(`La Sede con id ${id} no fue encontrada`);
    this.name = 'SedeNotFoundException';
  }
}
