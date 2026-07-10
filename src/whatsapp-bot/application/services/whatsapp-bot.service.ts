import { Injectable, Inject } from '@nestjs/common';
import {
  IWhatsappBotUseCases,
  IdentidadInput,
} from '../../domain/ports/input/whatsapp-bot-use-cases.interface';
import { IdentidadBotVerificada } from '../../domain/entities/identidad-bot.domain.entity';
import { IdentidadBotInvalidaForbiddenException } from '../../domain/exceptions/identidad-bot-invalida.exception';
import { ProductoBotNoEncontradoNotFoundException } from '../../domain/exceptions/producto-bot-no-encontrado.exception';
import {
  IUsuariosRepository,
  USUARIOS_REPOSITORY,
} from '../../../usuarios/domain/ports/output/usuarios-repository.interface';
import {
  IProductosUseCases,
  PRODUCTOS_USE_CASES,
} from '../../../productos/domain/ports/input/productos-use-cases.interface';
import {
  IItemsUseCases,
  ITEMS_USE_CASES,
} from '../../../items/domain/ports/input/items-use-cases.interface';
import {
  IInventarioUseCases,
  INVENTARIO_USE_CASES,
} from '../../../inventario/domain/ports/input/inventario-use-cases.interface';

const ROLES_PERMITIDOS = ['Administrador', 'Responsable de Bodega'];

@Injectable()
export class WhatsappBotService implements IWhatsappBotUseCases {
  constructor(
    @Inject(USUARIOS_REPOSITORY)
    private readonly usuariosRepository: IUsuariosRepository,
    @Inject(PRODUCTOS_USE_CASES)
    private readonly productosUseCases: IProductosUseCases,
    @Inject(ITEMS_USE_CASES)
    private readonly itemsUseCases: IItemsUseCases,
    @Inject(INVENTARIO_USE_CASES)
    private readonly inventarioUseCases: IInventarioUseCases,
  ) {}

  /**
   * Se revalida en cada operación (no solo al inicio de la conversación) porque
   * el bot no mantiene sesión: cada mensaje de n8n trae su propia identidad.
   */
  private async verificar(input: IdentidadInput): Promise<IdentidadBotVerificada> {
    const usuario = await this.usuariosRepository.findByNombreDocumentoTelefono(
      (input.nombre ?? '').trim(),
      (input.documento ?? '').trim(),
      (input.telefono ?? '').trim(),
    );

    if (!usuario || !usuario.estado) {
      throw new IdentidadBotInvalidaForbiddenException();
    }

    const rol = usuario.rol?.nombre;
    if (!rol || !ROLES_PERMITIDOS.includes(rol)) {
      throw new IdentidadBotInvalidaForbiddenException();
    }

    return { id_usuario: usuario.id_usuario, nombre: usuario.nombre, rol };
  }

  async verificarIdentidad(input: IdentidadInput): Promise<IdentidadBotVerificada> {
    return this.verificar(input);
  }

  async consultarStockProducto(
    identidad: IdentidadInput,
    criterio: { id_producto?: number; nombre_producto?: string },
  ) {
    await this.verificar(identidad);

    let id_producto = criterio.id_producto;

    if (!id_producto) {
      if (!criterio.nombre_producto) {
        throw new ProductoBotNoEncontradoNotFoundException('(sin nombre ni id de producto)');
      }
      const productos = await this.productosUseCases.obtenerProductos();
      const busqueda = criterio.nombre_producto.toLowerCase();
      const encontrado = productos.find((p) => p.nombre.toLowerCase().includes(busqueda));
      if (!encontrado) {
        throw new ProductoBotNoEncontradoNotFoundException(criterio.nombre_producto);
      }
      id_producto = encontrado.id_producto;
    }

    const producto = await this.productosUseCases.obtenerProductoPorId(id_producto);
    const stock = await this.inventarioUseCases.obtenerStockPorProducto(id_producto);
    return { producto, ...stock };
  }

  async buscarPorPlaca(identidad: IdentidadInput, placa: string) {
    await this.verificar(identidad);
    return this.itemsUseCases.buscarPorPlaca(placa);
  }

  async crearProducto(
    identidad: IdentidadInput,
    data: Parameters<IProductosUseCases['crearProducto']>[0],
  ) {
    await this.verificar(identidad);
    return this.productosUseCases.crearProducto(data);
  }

  async editarProducto(
    identidad: IdentidadInput,
    id_producto: number,
    data: Parameters<IProductosUseCases['actualizarProducto']>[1],
  ) {
    await this.verificar(identidad);
    return this.productosUseCases.actualizarProducto(id_producto, data);
  }
}
