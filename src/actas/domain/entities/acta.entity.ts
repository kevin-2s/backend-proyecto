export class Acta {
  constructor(
    public readonly id: number,
    public readonly fechaGen: Date,
    public readonly urlPdf: string,
    public readonly asignaId: number,
    public readonly devolucionId: number,
  ) {}
}
