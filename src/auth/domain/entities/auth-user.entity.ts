export class AuthUser {
    constructor(
        public readonly id: string,
        public readonly email: string,
        public readonly passwordHash: string,
        public readonly roles: string[],
        public readonly estado: boolean,
        public readonly tenantId: string
    ) {}
}
