import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RefreshDto {
    @ApiProperty({ description: 'Token de actualización JWT' })
    @IsString()
    @IsNotEmpty()
    refreshToken: string;
}
