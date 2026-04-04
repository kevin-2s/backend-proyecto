import { IsNotEmpty, IsString, IsNumber, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateInventarioDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    productoId!: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    sitioId!: string;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    cantidad!: number;
}
