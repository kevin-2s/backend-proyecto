import { IsNotEmpty, IsString, IsNumber, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductoDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    nombre!: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    descripcion!: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    categoriaId!: string;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    stockMinimo!: number;
}
