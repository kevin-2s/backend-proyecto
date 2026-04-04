export class Producto {
    constructor(
        public readonly id: string,
        public readonly nombre: string,
        public readonly descripcion: string,
        public readonly categoriaId: string,
        public readonly stockMinimo: number,
        public readonly createdAt: Date,
        public readonly updatedAt: Date
    ) {}
}
