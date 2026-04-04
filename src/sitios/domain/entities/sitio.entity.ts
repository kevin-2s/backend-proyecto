export class Sitio {
    constructor(
        public readonly id: string,
        public readonly nombre: string,
        public readonly tipoSitio: string,
        public readonly capacidad: number,
        public readonly createdAt: Date,
        public readonly updatedAt: Date
    ) {}
}
