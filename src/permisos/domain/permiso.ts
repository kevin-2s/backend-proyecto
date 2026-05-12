export class Permiso {
  constructor(
    public id_permiso: number,
    public nombre: string,
    public descripcion: string,
    public modulo: string,
    public activo: boolean,
  ) {}
}
