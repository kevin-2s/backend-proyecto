import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsNotEmpty, IsInt, MinLength, IsOptional } from 'class-validator';

export class CreateUsuarioDto {
  @ApiProperty({ example: 'Juan Pérez', description: 'Nombre completo del usuario' })
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @ApiProperty({ example: 'juan.perez@sgm.com', description: 'Correo institucional del usuario' })
  @IsEmail()
  @IsNotEmpty()
  correo: string;

  @ApiProperty({ example: '+573001234567', description: 'Número de teléfono del usuario', required: false })
  @IsString()
  @IsOptional()
  telefono?: string;

  @ApiProperty({ example: '123456789', description: 'Número de documento del usuario', required: false })
  @IsString()
  @IsOptional()
  documento?: string;

  @ApiProperty({ example: 'Password123!', description: 'Contraseña para inicio de sesión, mínimo 6 caracteres' })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @ApiProperty({ example: 1, description: 'ID del rol asignado al usuario' })
  @IsInt()
  @IsNotEmpty()
  id_rol: number;

  @ApiProperty({ example: 'UUID-Sede', description: 'Sede asignada (solo para administradores)', required: false })
  @IsString()
  @IsOptional()
  tenant_id?: string;
}
