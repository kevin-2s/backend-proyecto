export class AsignacionNotFoundException extends Error {
  constructor(id: number) {
    super(`Asignación con id ${id} no encontrada`);
    this.name = 'AsignacionNotFoundException';
  }
}
