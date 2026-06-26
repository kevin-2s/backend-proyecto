import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsBoolean, IsOptional, IsDateString, IsInt, IsNumber, ValidateIf, IsArray } from 'class-validator';
import { TipoMaterial } from '../../../../../domain/entities/producto.domain.entity';

export class CreateProductoDto {
  @ApiProperty({ example: 'Arroz blanco', description: 'Nombre del producto' })
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @ApiPropertyOptional({ example: 'Arroz blanco de grano largo para uso en gastronomía', description: 'Descripción detallada' })
  @IsString()
  @IsOptional()
  descripcion?: string;

  @ApiPropertyOptional({ example: '50101501', description: 'Código UNSPSC del producto (Colombia Compra Eficiente)' })
  @IsString()
  @IsOptional()
  codigo_unspsc?: string;

  @ApiPropertyOptional({ example: 'ARR-001', description: 'SKU del producto. Obligatorio salvo para productos de gastronomía (UNSPSC que inicia en 50)' })
  @ValidateIf((o) => !o.codigo_unspsc?.startsWith('50'))
  @IsString()
  @IsNotEmpty({ message: 'El SKU es obligatorio salvo para productos de gastronomía' })
  SKU?: string;

  @ApiProperty({ example: 'CONSUMO', description: 'Tipo de material: CONSUMO, DEVOLUTIVO o PERECEDERO' })
  @IsString()
  @IsNotEmpty()
  tipo_material: TipoMaterial;

  @ApiProperty({ example: 'KILOGRAMO', description: 'Unidad de medida del producto' })
  @IsString()
  @IsNotEmpty()
  unidad_medida: string;

  @ApiProperty({ example: false, description: 'Indicador si el producto es perecedero (tiene fecha de vencimiento)' })
  @IsBoolean()
  @IsNotEmpty()
  es_psd: boolean;

  @ApiPropertyOptional({ example: '2026-12-31', description: 'Fecha de vencimiento (requerida si es perecedero)' })
  @IsDateString()
  @IsOptional()
  fecha_vencimiento?: Date;

  @ApiProperty({ example: 1, description: 'ID de la categoría' })
  @IsInt()
  @IsNotEmpty()
  id_categoria: number;

  @ApiProperty({ example: 5, description: 'Cantidad de unidades a registrar' })
  @IsInt()
  @IsNotEmpty()
  cantidad: number;

  @ApiPropertyOptional({
    example: ['SENA-001', 'SENA-002'],
    description: 'Placas SENA opcionales para cada ítem generado, en el mismo orden que se crean (índice por índice). Si se omite o hay menos placas que la cantidad, los ítems restantes quedan sin placa.',
  })
  @IsArray()
  @IsOptional()
  @IsString({ each: true })
  placas_sena?: string[];

  @ApiProperty({ example: 2, description: 'Stock mínimo para alertas' })
  @IsInt()
  @IsNotEmpty()
  stock_minimo: number;

  @ApiPropertyOptional({ example: 'KILOGRAMO', description: 'Unidad de peso por bulto (solo cuando unidad_medida = BULTO)' })
  @IsString()
  @IsOptional()
  unidad_peso_bulto?: string;

  @ApiPropertyOptional({ example: 50, description: 'Peso por bulto en la unidad indicada (solo cuando unidad_medida = BULTO)' })
  @IsNumber()
  @IsOptional()
  peso_por_bulto?: number;

  @ApiProperty({ example: 1, description: 'ID de la bodega donde se almacenará el producto' })
  @IsInt()
  @IsNotEmpty()
  id_sitio: number;
}
