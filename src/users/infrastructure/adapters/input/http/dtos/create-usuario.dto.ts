import { IsNotEmpty, IsString, IsNumber, IsBoolean, IsEmail, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUsuarioDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    nombreCompleto!: string;

    @ApiProperty()
    @IsEmail()
    @IsNotEmpty()
    correo!: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    contrasena!: string;

    @ApiPropertyOptional({ default: true })
    @IsBoolean()
    @IsOptional()
    estado?: boolean;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    rolId!: number;
}
