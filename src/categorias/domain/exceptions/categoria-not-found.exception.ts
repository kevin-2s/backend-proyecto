export class CategoriaNotFoundException extends Error {
  constructor(id: number) {
    super(`La categoría con id ${id} no fue encontrada`);
    this.name = 'CategoriaNotFoundException';
  }
}
