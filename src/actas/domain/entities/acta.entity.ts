export class Acta {
    constructor(
        public readonly id: string,
        public readonly movimientoId: string,
        public readonly tipoActa: string,
        public readonly urlPdf: string,
        public readonly generadoPor: string,
        public readonly createdAt: Date,
        public readonly updatedAt: Date
    ) {}
}
