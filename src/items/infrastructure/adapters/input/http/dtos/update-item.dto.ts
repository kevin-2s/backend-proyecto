import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsInt } from 'class-validator';

export class UpdateItemDto {
  @ApiPropertyOptional({ example: 'SENA-12345', description: 'Placa SENA del ítem (única, opcional).' })
  @IsString()
  @IsOptional()
  placa_sena?: string;

  @ApiPropertyOptional({ example: 3, description: 'ID del sitio (bodega/ambiente) al que se reasigna el ítem directamente.' })
  @IsInt()
  @IsOptional()
  id_sitio?: number | null;
}
