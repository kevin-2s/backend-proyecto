export class UsuarioNotFoundException extends Error {
  constructor(id: number) {
    super(`El usuario con id ${id} no fue encontrado`);
    this.name = 'UsuarioNotFoundException';
  }
}
