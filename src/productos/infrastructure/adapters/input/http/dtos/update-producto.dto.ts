import { IsString, IsBoolean, IsOptional, IsDateString, IsInt, IsNumber } from 'class-validator';
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

  @IsString()
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

  @IsInt()
  @IsOptional()
  stock_minimo?: number;

  @IsString()
  @IsOptional()
  unidad_peso_bulto?: string;

  @IsNumber()
  @IsOptional()
  peso_por_bulto?: number;

  @IsInt()
  @IsOptional()
  id_sitio?: number;
}
