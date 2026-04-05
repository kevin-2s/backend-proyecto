import { IsNotEmpty, IsString, IsNumber, IsOptional, IsDateString, IsEnum } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

enum EstadoFisico { BUENO = 'BUENO', REGULAR = 'REGULAR', DAÑADO = 'DAÑADO', PERDIDO = 'PERDIDO' }
enum EstadoSolicitud { PENDIENTE = 'PENDIENTE', APROBADA = 'APROBADA', RECHAZADA = 'RECHAZADA', ENTREGADA = 'ENTREGADA', DEVUELTA = 'DEVUELTA' }

export class CreateAsignaDto {
  @ApiProperty() @IsEnum(EstadoFisico) @IsNotEmpty() estadoFisico: EstadoFisico;
  @ApiProperty() @IsEnum(EstadoSolicitud) @IsNotEmpty() estadoEntrega: EstadoSolicitud;
  @ApiProperty() @IsDateString() @IsNotEmpty() fechaEnt: string;
  @ApiPropertyOptional() @IsDateString() @IsOptional() fechaDevolucionEst?: string;
  @ApiPropertyOptional() @IsString() @IsOptional() observaciones?: string;
  @ApiProperty() @IsNumber() @IsNotEmpty() productoId: number;
  @ApiProperty() @IsNumber() @IsNotEmpty() usuarioId: number;
  @ApiPropertyOptional() @IsNumber() @IsOptional() fichaId?: number;
}
