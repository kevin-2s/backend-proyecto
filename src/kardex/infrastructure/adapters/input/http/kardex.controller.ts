import { Controller, Get, Param, ParseIntPipe, Inject, HttpStatus, HttpException } from '@nestjs/common';
import { KARDEX_USE_CASES, IKardexUseCases } from '../../../../domain/ports/input/kardex-use-cases.interface';

@Controller('kardex')
export class KardexController {
  constructor(
    @Inject(KARDEX_USE_CASES)
    private readonly kardexUseCases: IKardexUseCases,
  ) {}

  @Get()
  async getKardex() {
    try {
      const kardex = await this.kardexUseCases.obtenerKardex();
      return {
        statusCode: HttpStatus.OK,
        message: 'Kardex obtenido exitosamente',
        data: kardex,
      };
    } catch (error) {
      throw new HttpException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Error al obtener el kardex',
        data: null,
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id-item')
  async getKardexByItem(@Param('id-item', ParseIntPipe) idItem: number) {
    try {
      const kardex = await this.kardexUseCases.obtenerKardexPorItem(idItem);
      return {
        statusCode: HttpStatus.OK,
        message: 'Kardex del item obtenido exitosamente',
        data: kardex,
      };
    } catch (error) {
      throw new HttpException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Error al obtener el kardex del item',
        data: null,
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
