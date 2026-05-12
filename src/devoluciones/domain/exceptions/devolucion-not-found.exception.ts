export class DevolucionNotFoundException extends Error {
  constructor(id: number) {
    super(`La devolución con id ${id} no fue encontrada`);
    this.name = 'DevolucionNotFoundException';
  }
}
