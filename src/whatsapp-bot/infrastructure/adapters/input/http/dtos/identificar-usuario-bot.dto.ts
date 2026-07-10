import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class IdentificarUsuarioBotDto {
  @ApiProperty({ example: 'Juan Pérez', description: 'Nombre completo tal como está registrado en el sistema' })
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @ApiProperty({ example: '1020304050', description: 'Número de cédula registrado en el sistema' })
  @IsString()
  @IsNotEmpty()
  documento: string;

  @ApiProperty({ example: '573001234567', description: 'Número de WhatsApp del remitente (formato E.164 sin +, tal como lo entrega Meta)' })
  @IsString()
  @IsNotEmpty()
  telefono: string;
}
