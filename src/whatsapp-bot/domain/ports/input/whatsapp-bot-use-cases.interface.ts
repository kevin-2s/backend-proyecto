import { Producto } from '../../../../productos/domain/entities/producto.domain.entity';
import { Item } from '../../../../items/domain/entities/item.domain.entity';
import { IProductosUseCases } from '../../../../productos/domain/ports/input/productos-use-cases.interface';
import { IdentidadBotVerificada } from '../../entities/identidad-bot.domain.entity';

export const WHATSAPP_BOT_USE_CASES = Symbol('WHATSAPP_BOT_USE_CASES');

export interface IdentidadInput {
  nombre: string;
  documento: string;
  telefono: string;
}

export interface IWhatsappBotUseCases {
  verificarIdentidad(input: IdentidadInput): Promise<IdentidadBotVerificada>;

  consultarStockProducto(
    identidad: IdentidadInput,
    criterio: { id_producto?: number; nombre_producto?: string },
  ): Promise<{ producto: Producto; disponibles: number; total: number }>;

  buscarPorPlaca(
    identidad: IdentidadInput,
    placa: string,
  ): Promise<{
    item: Item;
    prestamo_activo: any | null;
    asignacion_activa: any | null;
    novedad_activa: any | null;
  } | null>;

  crearProducto(
    identidad: IdentidadInput,
    data: Parameters<IProductosUseCases['crearProducto']>[0],
  ): Promise<{ producto: Producto; items_generados: Item[] }>;

  editarProducto(
    identidad: IdentidadInput,
    id_producto: number,
    data: Parameters<IProductosUseCases['actualizarProducto']>[1],
  ): Promise<Producto>;
}
