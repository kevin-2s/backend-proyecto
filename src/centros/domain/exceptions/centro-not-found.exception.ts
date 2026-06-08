export class CentroNotFoundException extends Error {
  constructor(id: number) {
    super(`El Centro de Formación con id ${id} no fue encontrado`);
    this.name = 'CentroNotFoundException';
  }
}
