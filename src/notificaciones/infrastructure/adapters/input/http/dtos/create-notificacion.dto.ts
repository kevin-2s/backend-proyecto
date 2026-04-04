import { IsNotEmpty, IsString, IsNumber, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateNotificacionDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    usuarioId!: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    mensaje!: string;

    @ApiProperty()
    @IsBoolean()
    @IsNotEmpty()
    leida!: boolean;
}
