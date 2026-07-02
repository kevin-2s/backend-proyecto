import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { IdentificarUsuarioBotDto } from './identificar-usuario-bot.dto';
import { CreateProductoDto } from '../../../../../../productos/infrastructure/adapters/input/http/dtos/create-producto.dto';

export class CrearProductoBotDto extends IdentificarUsuarioBotDto {
  @ApiProperty({ type: CreateProductoDto, description: 'Datos del producto a registrar (mismos campos que el formulario web)' })
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => CreateProductoDto)
  producto: CreateProductoDto;
}
