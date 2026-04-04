export class Devolucion {
    constructor(
        public readonly id: string,
        public readonly asignacionId: string,
        public readonly cantidadDevuelta: number,
        public readonly estadoFisico: string,
        public readonly createdAt: Date,
        public readonly updatedAt: Date
    ) {}
}
