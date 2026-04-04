import { IsNotEmpty, IsString, IsNumber, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSitioDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    nombre!: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    tipoSitio!: string;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    capacidad!: number;
}
