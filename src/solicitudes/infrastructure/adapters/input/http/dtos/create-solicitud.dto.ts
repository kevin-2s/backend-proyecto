import { IsNotEmpty, IsString, IsNumber, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSolicitudDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    justificacion!: string;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    usuarioId!: number;
}
