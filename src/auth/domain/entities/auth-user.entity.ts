export class AuthUser {
    constructor(
        public readonly id: string,
        public readonly email: string,
        public readonly passwordHash: string,
        public readonly roles: string[],
        public readonly estado: boolean,
        public readonly tenantId: string,
        // Datos personales — se incluyen en el JWT para que el frontend los muestre
        public readonly nombre: string = '',
        public readonly correo: string = '',
        public readonly telefono: string = '',
        public readonly documento: string = '',
    ) {}
}
