import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoriaDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    nombreCat!: string;
}
