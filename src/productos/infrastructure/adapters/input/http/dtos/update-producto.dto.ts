import { IsString, IsEnum, IsBoolean, IsOptional, IsDateString, IsInt } from 'class-validator';
import { TipoMaterial } from '../../../../../domain/entities/producto.domain.entity';

export class UpdateProductoDto {
  @IsString()
  @IsOptional()
  nombre?: string;

  @IsString()
  @IsOptional()
  descripcion?: string;

  @IsString()
  @IsOptional()
  codigo_unspsc?: string;

  @IsString()
  @IsOptional()
  SKU?: string;

  @IsEnum(TipoMaterial)
  @IsOptional()
  tipo_material?: TipoMaterial;

  @IsString()
  @IsOptional()
  unidad_medida?: string;

  @IsBoolean()
  @IsOptional()
  es_psd?: boolean;

  @IsDateString()
  @IsOptional()
  fecha_vencimiento?: Date;

  @IsInt()
  @IsOptional()
  id_categoria?: number;
}
