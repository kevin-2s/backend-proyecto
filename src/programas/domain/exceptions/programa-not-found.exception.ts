export class ProgramaNotFoundException extends Error {
  constructor(id: number) {
    super(`Programa con ID ${id} no encontrado`);
    this.name = 'ProgramaNotFoundException';
  }
}
