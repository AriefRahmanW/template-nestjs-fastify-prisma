import { ApiProperty } from '@nestjs/swagger';
import {
    MinLength,
    IsString,
    IsStrongPassword,
    MaxLength
} from "class-validator"


export class LoginDto{
    @IsString()
    @ApiProperty({
        required: true
    })
    username: string

    @IsString()
    @MinLength(8)
    @IsStrongPassword({
        minSymbols: 1,
        minUppercase: 1,
        minNumbers: 1
    })
    @MaxLength(24)
    @ApiProperty({
        required: true
    })
    password: string
}