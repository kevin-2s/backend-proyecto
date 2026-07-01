import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsInt, Min } from 'class-validator';
import { TipoSolicitud } from '../../../../../domain/entities/solicitud.domain.entity';

export class CreateSolicitudDto {
  @ApiProperty({ example: 'PRESTAMO', description: 'Tipo de solicitud' })
  @IsString()
  @IsNotEmpty()
  tipo: TipoSolicitud;

  @ApiProperty({ example: 3, description: 'ID del producto solicitado' })
  @IsInt()
  @IsNotEmpty()
  id_producto: number;

  @ApiProperty({ example: 2, description: 'Cantidad de unidades solicitadas' })
  @IsInt()
  @Min(1)
  cantidad: number;

  @ApiProperty({ example: 'Para taller de redes', description: 'Observación o justificación', required: false })
  @IsString()
  @IsOptional()
  observacion?: string;

  @ApiProperty({ example: 1, description: 'ID de la ficha de formación', required: false })
  @IsInt()
  @IsOptional()
  id_ficha?: number;
}
