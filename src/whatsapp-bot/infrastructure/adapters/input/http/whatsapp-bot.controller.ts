import { Body, Controller, HttpStatus, Inject, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import { ApiTags } from '@nestjs/swagger';
import {
  IWhatsappBotUseCases,
  WHATSAPP_BOT_USE_CASES,
} from '../../../../domain/ports/input/whatsapp-bot-use-cases.interface';
import { Public } from '../../../../../auth/infrastructure/decorators/public.decorator';
import { IdentificarUsuarioBotDto } from './dtos/identificar-usuario-bot.dto';
import { ConsultarProductoBotDto } from './dtos/consultar-producto-bot.dto';
import { BuscarPlacaBotDto } from './dtos/buscar-placa-bot.dto';
import { CrearProductoBotDto } from './dtos/crear-producto-bot.dto';
import { EditarProductoBotDto } from './dtos/editar-producto-bot.dto';

/**
 * Endpoints consumidos por el flujo de n8n (bot de WhatsApp). Son @Public()
 * porque no hay sesión JWT: cada request trae nombre+documento+telefono y se
 * revalida contra la base de datos en cada llamada (ver WhatsappBotService).
 * No se exponen a Internet: n8n los llama por la red interna de Docker.
 */
@ApiTags('whatsapp-bot')
@Controller('whatsapp-bot')
@Public()
@Throttle({ default: { limit: 20, ttl: 60000 } })
export class WhatsappBotController {
  constructor(
    @Inject(WHATSAPP_BOT_USE_CASES)
    private readonly whatsappBotUseCases: IWhatsappBotUseCases,
  ) {}

  @Post('identificar')
  async identificar(@Body() dto: IdentificarUsuarioBotDto) {
    const identidad = await this.whatsappBotUseCases.verificarIdentidad(dto);
    return {
      statusCode: HttpStatus.OK,
      message: `Identidad verificada como ${identidad.rol}`,
      data: identidad,
    };
  }

  @Post('producto/stock')
  async consultarStock(@Body() dto: ConsultarProductoBotDto) {
    const resultado = await this.whatsappBotUseCases.consultarStockProducto(dto, {
      id_producto: dto.id_producto,
      nombre_producto: dto.nombre_producto,
    });
    return {
      statusCode: HttpStatus.OK,
      message: 'Stock consultado exitosamente',
      data: resultado,
    };
  }

  @Post('items/buscar-placa')
  async buscarPlaca(@Body() dto: BuscarPlacaBotDto) {
    const resultado = await this.whatsappBotUseCases.buscarPorPlaca(dto, dto.placa);
    return {
      statusCode: HttpStatus.OK,
      message: resultado ? 'Ítem encontrado' : 'No se encontró ningún ítem con esa placa',
      data: resultado,
    };
  }

  @Post('productos')
  async crearProducto(@Body() dto: CrearProductoBotDto) {
    const resultado = await this.whatsappBotUseCases.crearProducto(dto, dto.producto);
    return {
      statusCode: HttpStatus.CREATED,
      message: `Producto creado exitosamente con ${resultado.items_generados.length} ítem(s)`,
      data: resultado,
    };
  }

  @Patch('productos/:id')
  async editarProducto(@Param('id', ParseIntPipe) id: number, @Body() dto: EditarProductoBotDto) {
    const producto = await this.whatsappBotUseCases.editarProducto(dto, id, dto.producto);
    return {
      statusCode: HttpStatus.OK,
      message: 'Producto actualizado exitosamente',
      data: producto,
    };
  }
}
