import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString } from 'class-validator';
import { IdentificarUsuarioBotDto } from './identificar-usuario-bot.dto';

export class ConsultarProductoBotDto extends IdentificarUsuarioBotDto {
  @ApiPropertyOptional({ example: 12, description: 'ID del producto (si se conoce)' })
  @IsInt()
  @IsOptional()
  id_producto?: number;

  @ApiPropertyOptional({ example: 'arroz', description: 'Nombre o parte del nombre del producto (si no se conoce el ID)' })
  @IsString()
  @IsOptional()
  nombre_producto?: string;
}
