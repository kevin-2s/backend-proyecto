import { IsNotEmpty, IsString, IsNumber, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateReporteDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    tipoReporte!: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    parametros!: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    urlGenerado!: string;
}
