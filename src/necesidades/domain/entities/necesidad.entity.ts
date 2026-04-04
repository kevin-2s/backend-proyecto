export class Necesidad {
    constructor(
        public readonly id: string,
        public readonly productoId: string,
        public readonly cantidadNecesaria: number,
        public readonly justificacion: string,
        public readonly estado: string,
        public readonly createdAt: Date,
        public readonly updatedAt: Date
    ) {}
}
