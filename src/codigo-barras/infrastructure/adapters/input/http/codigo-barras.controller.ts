import { Controller, Post, Body, Res } from '@nestjs/common';
import { CodigoBarrasService } from '../../../../application/services/codigo-barras.service';
import { Response } from 'express';

@Controller('codigo-barras')
export class CodigoBarrasController {
  constructor(private readonly codigoBarrasService: CodigoBarrasService) {}

  @Post('validate')
  async validate(@Body('code') code: string, @Res() res: Response) {
    const result = await this.codigoBarrasService.validateCode(code);
    res.json(result);
  }
}
