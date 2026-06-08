import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsInt } from 'class-validator';

export class CreateFichaDto {
  @ApiProperty({ example: '2712345', description: 'Número de la ficha de formación' })
  @IsString()
  @IsNotEmpty()
  numero_ficha: string;

  @ApiProperty({ example: 1, description: 'ID del programa de formación' })
  @IsInt()
  @IsNotEmpty()
  id_programa: number;

  @ApiProperty({ example: 1, description: 'ID del instructor responsable', required: true })
  @IsInt()
  @IsNotEmpty()
  id_responsable: number;

  @ApiProperty({ example: 'Ambiente 102', description: 'Ambiente de formación', required: false })
  @IsString()
  ambiente?: string;
}
