export class AsignaNotFoundException extends Error {
    constructor(id: string) {
        super("Asigna con identificador " + id + " no encontrado");
        this.name = "AsignaNotFoundException";
    }
}
