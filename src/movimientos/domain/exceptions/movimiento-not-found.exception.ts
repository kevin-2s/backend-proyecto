export class MovimientoNotFoundException extends Error {
  constructor(id: number) {
    super(`El movimiento con id ${id} no fue encontrado`);
    this.name = 'MovimientoNotFoundException';
  }
}
