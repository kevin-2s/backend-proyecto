import { IsString, IsNotEmpty, IsEnum, IsOptional, IsInt } from 'class-validator';
import { TipoSolicitud } from '../../../../../domain/entities/solicitud.domain.entity';

export class CreateSolicitudDto {
  @IsEnum(TipoSolicitud)
  @IsNotEmpty()
  tipo: TipoSolicitud;

  @IsString()
  @IsOptional()
  observacion?: string;

  @IsInt()
  @IsNotEmpty()
  id_usuario: number;

  @IsInt()
  @IsOptional()
  id_ficha?: number;
}
