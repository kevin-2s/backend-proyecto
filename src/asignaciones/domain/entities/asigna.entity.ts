export class Asigna {
    constructor(
        public readonly id: string,
        public readonly solicitudId: string,
        public readonly inventarioId: string,
        public readonly cantidad: number,
        public readonly createdAt: Date,
        public readonly updatedAt: Date
    ) {}
}
