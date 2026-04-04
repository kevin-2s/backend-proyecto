export class SolicitudNotFoundException extends Error {
    constructor(id: string) {
        super("Solicitud con identificador " + id + " no encontrado");
        this.name = "SolicitudNotFoundException";
    }
}
