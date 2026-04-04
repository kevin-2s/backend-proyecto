export class ChequeoNotFoundException extends Error {
    constructor(id: string) {
        super("Chequeo con identificador " + id + " no encontrado");
        this.name = "ChequeoNotFoundException";
    }
}
