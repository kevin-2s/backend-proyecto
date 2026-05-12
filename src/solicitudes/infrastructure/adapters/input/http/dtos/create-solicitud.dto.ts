import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEnum, IsOptional, IsInt } from 'class-validator';
import { TipoSolicitud } from '../../../../../domain/entities/solicitud.domain.entity';

export class CreateSolicitudDto {
  @ApiProperty({ example: TipoSolicitud.PRESTAMO, enum: TipoSolicitud, description: 'Tipo de solicitud' })
  @IsEnum(TipoSolicitud)
  @IsNotEmpty()
  tipo: TipoSolicitud;

  @ApiProperty({ example: 'Para taller de redes', description: 'Observación o justificación', required: false })
  @IsString()
  @IsOptional()
  observacion?: string;

  @ApiProperty({ example: 1, description: 'ID del usuario que realiza la solicitud' })
  @IsInt()
  @IsNotEmpty()
  id_usuario: number;

  @ApiProperty({ example: 1, description: 'ID de la ficha de formación', required: false })
  @IsInt()
  @IsOptional()
  id_ficha?: number;
}
