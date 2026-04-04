import { IsNotEmpty, IsString, IsNumber, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateNecesidadDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    productoId!: string;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    cantidadNecesaria!: number;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    justificacion!: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    estado!: string;
}
