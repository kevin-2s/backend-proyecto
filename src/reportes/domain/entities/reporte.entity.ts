export class Reporte {
    constructor(
        public readonly id: string,
        public readonly tipoReporte: string,
        public readonly parametros: string,
        public readonly urlGenerado: string,
        public readonly createdAt: Date,
        public readonly updatedAt: Date
    ) {}
}
