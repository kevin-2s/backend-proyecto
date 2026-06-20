import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class AgregarItemProductoDto {
  @ApiPropertyOptional({ example: 'SENA-12345', description: 'Placa SENA del nuevo ítem (opcional, única por ítem). El código SKU se copia automáticamente del producto.' })
  @IsString()
  @IsOptional()
  placa_sena?: string;
}
