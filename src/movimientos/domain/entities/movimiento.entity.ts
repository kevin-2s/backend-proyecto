export class Movimiento {
    constructor(
        public readonly id: string,
        public readonly tipoMovimiento: string,
        public readonly productoId: string,
        public readonly cantidad: number,
        public readonly sitioOrigenId: string,
        public readonly sitioDestinoId: string,
        public readonly usuarioId: string,
        public readonly createdAt: Date,
        public readonly updatedAt: Date
    ) {}
}
