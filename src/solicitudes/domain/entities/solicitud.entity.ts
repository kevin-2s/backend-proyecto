export class Solicitud {
  constructor(
    public readonly id: number,
    public readonly fechaSol: Date,
    public readonly fechaRespuesta: Date,
    public readonly estadoSol: string,
    public readonly justificacion: string,
    public readonly observacionRespuesta: string,
    public readonly usuarioId: number,
    public readonly usuarioRespondeId: number,
  ) {}
}
