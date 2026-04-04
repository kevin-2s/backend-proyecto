import { IsNotEmpty, IsString, IsNumber, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFichaDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    codigo!: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    programa!: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    estado!: string;
}
