export class FichaNotFoundException extends Error {
  constructor(id: number) {
    super(`La ficha con id ${id} no fue encontrada`);
    this.name = 'FichaNotFoundException';
  }
}
