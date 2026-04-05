import { IsString, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CrearProductoDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  descripcion?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  codigoUNSPSC?: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  SKU: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  imagenUrl?: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  categoriaId: number;
}
