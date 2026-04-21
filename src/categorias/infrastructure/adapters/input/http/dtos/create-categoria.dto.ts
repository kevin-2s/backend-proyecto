import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateCategoriaDto {
  @ApiProperty({ example: 'Herramientas', description: 'Categoría del producto' })
  @IsString()
  @IsNotEmpty()
  nombre: string;
}
