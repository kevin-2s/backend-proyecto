export class CategoriaNotFoundException extends Error {
    constructor(id: string) {
        super("Categoria con identificador " + id + " no encontrado");
        this.name = "CategoriaNotFoundException";
    }
}
