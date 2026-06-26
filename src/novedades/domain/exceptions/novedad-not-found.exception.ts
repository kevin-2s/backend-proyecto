export class NovedadNotFoundException extends Error {
  constructor(id: number) {
    super(`Novedad con id ${id} no encontrada`);
  }
}
