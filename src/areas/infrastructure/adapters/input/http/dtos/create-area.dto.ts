import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsBoolean } from 'class-validator';

export class CreateAreaDto {
  @ApiProperty({ example: 'Teleinformática', description: 'Nombre del área de formación' })
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @ApiProperty({ example: true, description: 'Estado activo/inactivo', required: false, default: true })
  @IsBoolean()
  @IsOptional()
  estado?: boolean;
}
