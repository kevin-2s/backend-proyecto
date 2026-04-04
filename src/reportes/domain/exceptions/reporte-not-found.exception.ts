export class ReporteNotFoundException extends Error {
    constructor(id: string) {
        super("Reporte con identificador " + id + " no encontrado");
        this.name = "ReporteNotFoundException";
    }
}
