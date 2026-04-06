import { IsNotEmpty, IsString, IsNumber, IsEnum, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { TipoMovimiento } from '../../../../../../shared/domain/enums';

export class CreateMovimientoDto {
    @ApiProperty({ enum: TipoMovimiento })
    @IsEnum(TipoMovimiento)
    @IsNotEmpty()
    tipo!: TipoMovimiento;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    cantidad!: number;

    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    observaciones?: string;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    productoId!: number;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    usuarioId!: number;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    sitioId!: number;
}
