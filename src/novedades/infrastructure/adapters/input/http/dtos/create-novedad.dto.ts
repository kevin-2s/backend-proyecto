import { IsEnum, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { TipoNovedad, EstadoNovedad } from '../../../../../domain/entities/novedad.domain.entity';

export class CreateNovedadDto {
  @IsEnum(TipoNovedad)
  @IsNotEmpty()
  tipo: string;

  @IsString()
  @IsNotEmpty()
  descripcion: string;

  @IsInt()
  @IsNotEmpty()
  id_usuario: number;

  @IsInt()
  @IsOptional()
  id_item?: number | null;

  @IsEnum(EstadoNovedad)
  @IsOptional()
  estado?: string;
}
