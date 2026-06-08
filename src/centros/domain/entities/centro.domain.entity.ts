export class Centro {
  constructor(
    public readonly id_centro: number,
    public nombre: string,
    public codigo: string,
    public regional: string,
    public estado: boolean = true,
  ) {}
}
