export class Chequeo {
    constructor(
        public readonly id: string,
        public readonly sitioId: string,
        public readonly responsableId: string,
        public readonly createdAt: Date,
        public readonly updatedAt: Date
    ) {}
}
