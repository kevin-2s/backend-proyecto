export class Notificacion {
    constructor(
        public readonly id: string,
        public readonly usuarioId: string,
        public readonly mensaje: string,
        public readonly leida: boolean,
        public readonly createdAt: Date,
        public readonly updatedAt: Date
    ) {}
}
