import { Controller, Post, Body, Res } from '@nestjs/common';
import { QrService } from '../../../../application/services/qr.service';
import { Response } from 'express';

@Controller('qr')
export class QrController {
  constructor(private readonly qrService: QrService) {}

  @Post('validate')
  async validate(@Body('code') code: string, @Res() res: Response) {
    const result = await this.qrService.validateCode(code);
    res.json(result);
  }
}
