export class Sitio {
  constructor(
    public readonly id: number,
    public readonly nombreSitio: string,
    public readonly tipo: string,
    public readonly responsableId: number,
  ) {}
}
