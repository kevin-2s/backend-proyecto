export class SitioNotFoundException extends Error {
  constructor(id: number) {
    super(`El sitio con id ${id} no fue encontrado`);
    this.name = 'SitioNotFoundException';
  }
}
