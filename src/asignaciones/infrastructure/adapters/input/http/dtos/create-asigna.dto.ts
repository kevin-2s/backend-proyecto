import { IsNotEmpty, IsString, IsNumber, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAsignaDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    solicitudId!: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    inventarioId!: string;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    cantidad!: number;
}
