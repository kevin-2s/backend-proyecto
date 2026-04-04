export class InventarioNotFoundException extends Error {
    constructor(id: string) {
        super("Inventario con identificador " + id + " no encontrado");
        this.name = "InventarioNotFoundException";
    }
}
