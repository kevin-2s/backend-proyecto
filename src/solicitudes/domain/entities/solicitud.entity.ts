export class Solicitud {
    constructor(
        public readonly id: string,
        public readonly usuarioId: string,
        public readonly estado: string,
        public readonly createdAt: Date,
        public readonly updatedAt: Date
    ) {}
}
