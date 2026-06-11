import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsBoolean, IsNumber } from 'class-validator';

export class CreateAreaDto {
  @ApiProperty({ example: 'Teleinformática', description: 'Nombre del área de formación' })
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @ApiProperty({ example: 1, description: 'ID de la sede a la que pertenece' })
  @IsNumber()
  @IsNotEmpty()
  id_sede: number;

  @ApiProperty({ example: true, description: 'Estado activo/inactivo', required: false, default: true })
  @IsBoolean()
  @IsOptional()
  estado?: boolean;
}
