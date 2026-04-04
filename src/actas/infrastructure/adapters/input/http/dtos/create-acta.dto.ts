import { IsNotEmpty, IsString, IsNumber, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateActaDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    movimientoId!: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    tipoActa!: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    urlPdf!: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    generadoPor!: string;
}
