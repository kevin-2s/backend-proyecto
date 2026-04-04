export class Ficha {
    constructor(
        public readonly id: string,
        public readonly codigo: string,
        public readonly programa: string,
        public readonly estado: string,
        public readonly createdAt: Date,
        public readonly updatedAt: Date
    ) {}
}
