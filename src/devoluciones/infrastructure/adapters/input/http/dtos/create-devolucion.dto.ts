import { IsNotEmpty, IsString, IsNumber, IsOptional, IsDateString, IsEnum } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

enum EstadoFisico { BUENO = 'BUENO', REGULAR = 'REGULAR', DAÑADO = 'DAÑADO', PERDIDO = 'PERDIDO' }

export class CreateDevolucionDto {
  @ApiProperty() @IsEnum(EstadoFisico) @IsNotEmpty() estadoFisico: EstadoFisico;
  @ApiProperty() @IsDateString() @IsNotEmpty() fechaReal: string;
  @ApiPropertyOptional() @IsString() @IsOptional() observaciones?: string;
  @ApiProperty() @IsNumber() @IsNotEmpty() asignaId: number;
  @ApiProperty() @IsNumber() @IsNotEmpty() productoId: number;
  @ApiProperty() @IsNumber() @IsNotEmpty() movimientoId: number;
}
