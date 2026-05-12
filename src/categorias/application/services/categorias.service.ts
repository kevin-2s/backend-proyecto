import { Injectable, Inject } from '@nestjs/common';
import { ICategoriasUseCases } from '../../domain/ports/input/categorias-use-cases.interface';
import { ICategoriasRepository, CATEGORIAS_REPOSITORY } from '../../domain/ports/output/categorias-repository.interface';
import { Categoria } from '../../domain/entities/categoria.domain.entity';
import { CategoriaNotFoundException } from '../../domain/exceptions/categoria-not-found.exception';

@Injectable()
export class CategoriasService implements ICategoriasUseCases {
  constructor(
    @Inject(CATEGORIAS_REPOSITORY)
    private readonly categoriasRepository: ICategoriasRepository,
  ) {}

  async obtenerCategorias(): Promise<Categoria[]> {
    return this.categoriasRepository.findAll();
  }

  async obtenerCategoriaPorId(id: number): Promise<Categoria> {
    const categoria = await this.categoriasRepository.findById(id);
    if (!categoria) {
      throw new CategoriaNotFoundException(id);
    }
    return categoria;
  }

  async crearCategoria(nombre: string): Promise<Categoria> {
    return this.categoriasRepository.create({ nombre });
  }
}
