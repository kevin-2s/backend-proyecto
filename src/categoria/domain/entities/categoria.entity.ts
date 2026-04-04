export class Categoria {
    constructor(
        public readonly id: string,
        public readonly nombre: string,
        public readonly descripcion: string,
        public readonly createdAt: Date,
        public readonly updatedAt: Date
    ) {}
}
