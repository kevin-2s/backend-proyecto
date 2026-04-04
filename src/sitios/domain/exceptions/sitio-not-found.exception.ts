export class SitioNotFoundException extends Error {
    constructor(id: string) {
        super("Sitio con identificador " + id + " no encontrado");
        this.name = "SitioNotFoundException";
    }
}
