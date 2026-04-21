import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsInt } from 'class-validator';

export class CreateFichaDto {
  @ApiProperty({ example: '2712345', description: 'Número de la ficha de formación' })
  @IsString()
  @IsNotEmpty()
  numero_ficha: string;

  @ApiProperty({ example: 'ADSO', description: 'Programa de formación' })
  @IsString()
  @IsNotEmpty()
  programa: string;

  @ApiProperty({ example: 1, description: 'ID del instructor responsable', required: false })
  @IsInt()
  @IsOptional()
  id_responsable?: number;
}
