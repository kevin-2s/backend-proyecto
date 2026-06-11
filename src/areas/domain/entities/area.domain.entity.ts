export class Area {
  constructor(
    public readonly id_area: number,
    public nombre: string,
    public id_sede?: number | null,
    public sede?: any,
    public estado: boolean = true,
  ) {}
}
