export class NecesidadNotFoundException extends Error {
    constructor(id: string) {
        super("Necesidad con identificador " + id + " no encontrado");
        this.name = "NecesidadNotFoundException";
    }
}
