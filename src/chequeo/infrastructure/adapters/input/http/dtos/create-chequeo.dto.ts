import { IsNotEmpty, IsString, IsNumber, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateChequeoDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    sitioId!: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    responsableId!: string;
}
