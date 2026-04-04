import { IsNotEmpty, IsString, IsNumber, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDevolucionDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    asignacionId!: string;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    cantidadDevuelta!: number;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    estadoFisico!: string;
}
