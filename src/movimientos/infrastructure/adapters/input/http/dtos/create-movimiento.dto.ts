import { IsNotEmpty, IsString, IsNumber, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMovimientoDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    tipoMovimiento!: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    productoId!: string;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    cantidad!: number;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    sitioOrigenId!: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    sitioDestinoId!: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    usuarioId!: string;
}
