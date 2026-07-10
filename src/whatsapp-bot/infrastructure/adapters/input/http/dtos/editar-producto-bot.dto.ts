import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { IdentificarUsuarioBotDto } from './identificar-usuario-bot.dto';
import { UpdateProductoDto } from '../../../../../../productos/infrastructure/adapters/input/http/dtos/update-producto.dto';

export class EditarProductoBotDto extends IdentificarUsuarioBotDto {
  @ApiProperty({ type: UpdateProductoDto, description: 'Campos del producto a actualizar (parcial)' })
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => UpdateProductoDto)
  producto: UpdateProductoDto;
}
