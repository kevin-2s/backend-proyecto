import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRoleDto {
    @ApiProperty({ example: 'Administrador', description: 'Nombre del rol' })
    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    name!: string;

    @ApiProperty({ example: 'Acceso total', description: 'Descripción de permisos del rol' })
    @IsString()
    @IsNotEmpty()
    @MaxLength(255)
    description!: string;
}
