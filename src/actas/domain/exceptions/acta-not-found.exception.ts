export class ActaNotFoundException extends Error {
    constructor(id: string) {
        super("Acta con identificador " + id + " no encontrado");
        this.name = "ActaNotFoundException";
    }
}
