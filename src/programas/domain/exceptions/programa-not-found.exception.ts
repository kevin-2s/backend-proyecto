export class ProgramaNotFoundException extends Error {
  constructor(id: number) {
    super(`El programa con id ${id} no fue encontrado`);
    this.name = 'ProgramaNotFoundException';
  }
}
