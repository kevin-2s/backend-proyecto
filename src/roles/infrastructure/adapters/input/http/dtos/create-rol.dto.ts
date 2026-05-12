import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateRolDto {
  @ApiProperty({ example: 'Administrador', description: 'Nombre del rol' })
  @IsString()
  @IsNotEmpty()
  nombre: string;
}
