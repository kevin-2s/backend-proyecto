export class Notificacion {
  constructor(
    public readonly id: number,
    public readonly mensaje: string,
    public readonly leida: boolean,
    public readonly fechaEnvio: Date,
    public readonly tipoEvento: string,
    public readonly usuarioId: number,
  ) {}
}
