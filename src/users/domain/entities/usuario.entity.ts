export class Usuario {
    constructor(
        public readonly id: string,
        public readonly email: string,
        public readonly passwordHash: string,
        public readonly nombres: string,
        public readonly apellidos: string,
        public readonly rolId: string,
        public readonly createdAt: Date,
        public readonly updatedAt: Date
    ) {}
}
