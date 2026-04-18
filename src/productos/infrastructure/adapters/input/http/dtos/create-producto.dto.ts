import { IsString, IsNotEmpty, IsEnum, IsBoolean, IsOptional, IsDateString, IsInt } from 'class-validator';
import { TipoMaterial } from '../../../../../domain/entities/producto.domain.entity';

export class CreateProductoDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsNotEmpty()
  descripcion: string;

  @IsString()
  @IsNotEmpty()
  codigo_unspsc: string;

  @IsString()
  @IsNotEmpty()
  SKU: string;

  @IsEnum(TipoMaterial)
  @IsNotEmpty()
  tipo_material: TipoMaterial;

  @IsString()
  @IsNotEmpty()
  unidad_medida: string;

  @IsBoolean()
  @IsNotEmpty()
  es_psd: boolean;

  @IsDateString()
  @IsOptional()
  fecha_vencimiento?: Date;

  @IsInt()
  @IsNotEmpty()
  id_categoria: number;
}
