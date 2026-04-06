import { IsNotEmpty, IsNumber, IsOptional, IsBoolean, IsDateString, IsArray, ValidateNested, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

class CreateItemChequeoDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  descripcion: string;

  @ApiProperty()
  @IsBoolean()
  @IsNotEmpty()
  estadoItem: boolean;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  observacion?: string;
}

export class CreateChequeoDto {
  @ApiProperty() @IsDateString() @IsNotEmpty() fechaChequeo: string;
  @ApiProperty() @IsBoolean() @IsNotEmpty() confirmado: boolean;
  @ApiPropertyOptional() @IsNumber() @IsOptional() asignaId?: number;
  @ApiPropertyOptional() @IsNumber() @IsOptional() devolucionId?: number;
  @ApiProperty() @IsNumber() @IsNotEmpty() usuarioId: number;
  @ApiProperty({ type: [CreateItemChequeoDto] }) @IsArray() @ValidateNested({ each: true }) @Type(() => CreateItemChequeoDto) items: CreateItemChequeoDto[];
}
