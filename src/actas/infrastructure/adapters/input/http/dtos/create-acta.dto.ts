import { IsOptional, IsString, IsNumber } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class CreateActaDto {
  @ApiPropertyOptional() @IsString() @IsOptional() urlPdf?: string;
  @ApiPropertyOptional() @IsNumber() @IsOptional() asignaId?: number;
  @ApiPropertyOptional() @IsNumber() @IsOptional() devolucionId?: number;
}
