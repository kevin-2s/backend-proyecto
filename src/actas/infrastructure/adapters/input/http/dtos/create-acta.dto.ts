import { IsEnum, IsString, IsNotEmpty, IsOptional, IsInt } from 'class-validator';
import { TipoActa } from '../../../../../domain/entities/acta.domain.entity';

export class CreateActaDto {
  @IsEnum(TipoActa)
  @IsNotEmpty()
  tipo: TipoActa;

  @IsString()
  @IsNotEmpty()
  archivo_url: string;

  @IsInt()
  @IsOptional()
  id_solicitud?: number;

  @IsInt()
  @IsOptional()
  id_devolucion?: number;
}
