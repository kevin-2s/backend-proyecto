import { IsNotEmpty, IsString, IsNumber, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSolicitudDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    usuarioId!: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    estado!: string;
}
