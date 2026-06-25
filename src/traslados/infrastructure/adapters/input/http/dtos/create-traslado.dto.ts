import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsInt } from 'class-validator';

export class CreateTrasladoDto {
  @ApiProperty({ example: 12, description: 'ID del ítem a trasladar (debe estar DISPONIBLE)' })
  @IsInt()
  @IsNotEmpty()
  id_item: number;

  @ApiProperty({ example: 3, description: 'ID del sitio (ambiente/laboratorio/otro) de destino' })
  @IsInt()
  @IsNotEmpty()
  id_sitio_destino: number;

  @ApiProperty({ example: 'Se necesita en el laboratorio de redes para la ficha 2589451', description: 'Justificación del traslado', required: false })
  @IsString()
  @IsOptional()
  justificacion?: string;

  @ApiProperty({ example: 1, description: 'ID del usuario que solicita el traslado' })
  @IsInt()
  @IsNotEmpty()
  id_usuario_solicita: number;
}
