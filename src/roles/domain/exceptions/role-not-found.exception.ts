export class RoleNotFoundException extends Error {
    constructor(id: string) {
        super(`El rol con identificador ${id} no fue encontrado`);
        this.name = 'RoleNotFoundException';
    }
}
