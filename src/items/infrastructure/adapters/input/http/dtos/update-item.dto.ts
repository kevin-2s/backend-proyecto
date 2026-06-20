import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class UpdateItemDto {
  @ApiPropertyOptional({ example: 'SENA-12345', description: 'Placa SENA del ítem (única, opcional). El código SKU del ítem siempre es el del producto y no se puede editar.' })
  @IsString()
  @IsOptional()
  placa_sena?: string;
}
