export class FichaNotFoundException extends Error {
    constructor(id: string) {
        super("Ficha con identificador " + id + " no encontrado");
        this.name = "FichaNotFoundException";
    }
}
