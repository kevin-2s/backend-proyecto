export class ProductoNotFoundException extends Error {
  constructor(id: number) {
    super(`El producto con id ${id} no fue encontrado`);
    this.name = 'ProductoNotFoundException';
  }
}
