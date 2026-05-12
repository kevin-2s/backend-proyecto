export class InventarioNotFoundException extends Error {
  constructor(id: number) {
    super(`El registro de inventario con id ${id} no fue encontrado`);
    this.name = 'InventarioNotFoundException';
  }
}
