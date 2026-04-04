export class ProductoNotFoundException extends Error {
    constructor(id: string) {
        super("Producto con identificador " + id + " no encontrado");
        this.name = "ProductoNotFoundException";
    }
}
