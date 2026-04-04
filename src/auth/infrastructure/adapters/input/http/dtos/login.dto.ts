import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
    @ApiProperty({ example: 'admin@sena.edu.co', description: 'Correo electrónico del usuario' })
    @IsEmail({}, { message: 'El formato del correo es inválido' })
    @IsNotEmpty({ message: 'El correo es obligatorio' })
    email!: string;

    @ApiProperty({ example: 'password123', description: 'Contraseña del usuario' })
    @IsString()
    @IsNotEmpty({ message: 'La contraseña es obligatoria' })
    @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
    password!: string;
}
