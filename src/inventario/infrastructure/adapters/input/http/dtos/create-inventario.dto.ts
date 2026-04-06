import { IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateInventarioDto {
    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    cantidadActual!: number;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    stockMinimo!: number;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    productoId!: number;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    sitioId!: number;
}
