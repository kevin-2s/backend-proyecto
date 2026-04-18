export class ItemNotFoundException extends Error {
  constructor(id: number) {
    super(`El item con id ${id} no fue encontrado`);
    this.name = 'ItemNotFoundException';
  }
}
