export enum EstadoNovedad {
  PENDIENTE = 'PENDIENTE',
  EN_PROCESO = 'EN_PROCESO',
  RESUELTA = 'RESUELTA',
}

export enum TipoNovedad {
  DANO = 'DAÑO',
  PERDIDA = 'PERDIDA',
  MANTENIMIENTO = 'MANTENIMIENTO',
  DISCREPANCIA = 'DISCREPANCIA',
  OTRO = 'OTRO',
}

export class Novedad {
  constructor(
    public readonly id_novedad: number,
    public tipo: string,
    public descripcion: string,
    public estado: string,
    public fecha: Date,
    public id_usuario: number,
    public id_item: number | null,
    public item?: any,
    public usuario?: any,
  ) {}
}
