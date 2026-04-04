export class MovimientoNotFoundException extends Error {
    constructor(id: string) {
        super("Movimiento con identificador " + id + " no encontrado");
        this.name = "MovimientoNotFoundException";
    }
}
