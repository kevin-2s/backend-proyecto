export class Inventario {
    constructor(
        public readonly id: string,
        public readonly productoId: string,
        public readonly sitioId: string,
        public readonly cantidad: number,
        public readonly createdAt: Date,
        public readonly updatedAt: Date
    ) {}
}
