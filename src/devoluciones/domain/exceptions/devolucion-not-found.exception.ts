export class DevolucionNotFoundException extends Error {
    constructor(id: string) {
        super("Devolucion con identificador " + id + " no encontrado");
        this.name = "DevolucionNotFoundException";
    }
}
