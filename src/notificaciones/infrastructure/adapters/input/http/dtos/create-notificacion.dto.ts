import { IsNotEmpty, IsString, IsNumber, IsOptional, IsBoolean } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateNotificacionDto {
  @ApiProperty() @IsString() @IsNotEmpty() mensaje: string;
  @ApiPropertyOptional() @IsBoolean() @IsOptional() leida?: boolean;
  @ApiProperty() @IsString() @IsNotEmpty() tipoEvento: string;
  @ApiProperty() @IsNumber() @IsNotEmpty() usuarioId: number;
}
