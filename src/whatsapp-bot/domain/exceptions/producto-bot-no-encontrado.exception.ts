export class ProductoBotNoEncontradoNotFoundException extends Error {
  constructor(criterio: string) {
    super(`No se encontró ningún producto que coincida con "${criterio}"`);
    this.name = 'ProductoBotNoEncontradoNotFoundException';
  }
}
