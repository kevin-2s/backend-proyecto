export class AreaNotFoundException extends Error {
  constructor(id: number) {
    super(`Área con ID ${id} no encontrada`);
    this.name = 'AreaNotFoundException';
  }
}
