export class RolNotFoundException extends Error {
  constructor(id: number) {
    super(`El rol con id ${id} no fue encontrado`);
    this.name = 'RolNotFoundException';
  }
}
