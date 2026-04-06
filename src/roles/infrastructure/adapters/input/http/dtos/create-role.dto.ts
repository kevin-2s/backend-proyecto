import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRoleDto {
    @ApiProperty({ example: 'Administrador', description: 'Nombre del rol' })
    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    nombreRol!: string;
}
