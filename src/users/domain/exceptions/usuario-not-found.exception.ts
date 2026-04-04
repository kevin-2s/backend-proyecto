export class UsuarioNotFoundException extends Error {
    constructor(id: string) {
        super("Usuario con identificador " + id + " no encontrado");
        this.name = "UsuarioNotFoundException";
    }
}
