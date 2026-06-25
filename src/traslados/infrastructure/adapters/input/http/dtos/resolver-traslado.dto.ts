import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class ResolverTrasladoDto {
  @ApiProperty({ example: 1, description: 'ID del usuario que aprueba o rechaza el traslado' })
  @IsInt()
  @IsNotEmpty()
  id_usuario_aprueba: number;

  @ApiProperty({ example: 'No hay disponibilidad en ese lugar', description: 'Observación de la resolución (opcional, útil al rechazar)', required: false })
  @IsString()
  @IsOptional()
  observacion_resolucion?: string;
}
