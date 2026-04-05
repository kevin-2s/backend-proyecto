import { IsNotEmpty, IsNumber, IsOptional, IsDateString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateNecesidadDto {
  @ApiProperty() @IsNumber() @IsNotEmpty() cantidadN: number;
  @ApiPropertyOptional() @IsDateString() @IsOptional() fechaLimite?: string;
  @ApiProperty() @IsNumber() @IsNotEmpty() usuarioId: number;
  @ApiProperty() @IsNumber() @IsNotEmpty() productoId: number;
  @ApiProperty() @IsNumber() @IsNotEmpty() fichaId: number;
}
