import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEnum, IsBoolean, IsOptional, IsDateString, IsInt } from 'class-validator';
import { TipoMaterial } from '../../../../../domain/entities/producto.domain.entity';

export class CreateProductoDto {
  @ApiProperty({ example: 'Martillo', description: 'Nombre del producto' })
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @ApiProperty({ example: 'Martillo de acero templado', description: 'Descripción detallada' })
  @IsString()
  @IsNotEmpty()
  descripcion: string;

  @ApiProperty({ example: '27111600', description: 'Código UNSPSC del producto' })
  @IsString()
  @IsNotEmpty()
  codigo_unspsc: string;

  @ApiProperty({ example: 'MAR-001', description: 'SKU del producto' })
  @IsString()
  @IsNotEmpty()
  SKU: string;

  @ApiProperty({ example: TipoMaterial.CONSUMO, enum: TipoMaterial, description: 'Tipo de material' })
  @IsEnum(TipoMaterial)
  @IsNotEmpty()
  tipo_material: TipoMaterial;

  @ApiProperty({ example: 'UNIDAD', description: 'Unidad de medida del producto' })
  @IsString()
  @IsNotEmpty()
  unidad_medida: string;

  @ApiProperty({ example: true, description: 'Indicador si requiere un control PSD' })
  @IsBoolean()
  @IsNotEmpty()
  es_psd: boolean;

  @ApiProperty({ example: '2026-12-31T00:00:00.000Z', description: 'Fecha de vencimiento', required: false })
  @IsDateString()
  @IsOptional()
  fecha_vencimiento?: Date;

  @ApiProperty({ example: 1, description: 'ID de la categoría a la que pertenece' })
  @IsInt()
  @IsNotEmpty()
  id_categoria: number;
}
