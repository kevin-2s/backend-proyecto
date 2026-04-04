export class NotificacionNotFoundException extends Error {
    constructor(id: string) {
        super("Notificacion con identificador " + id + " no encontrado");
        this.name = "NotificacionNotFoundException";
    }
}
