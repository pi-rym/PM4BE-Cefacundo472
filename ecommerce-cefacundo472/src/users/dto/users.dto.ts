import { PickType } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, isNotEmpty, IsNumber, IsString, IsStrongPassword, MaxLength, MinLength } from "class-validator";

export class CreateUserDto{

    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(50)
    name!: string;


    @IsNotEmpty()
    @IsEmail({},{message:'Email debe ser valido'})
    email!: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    @MaxLength(15)
    @IsStrongPassword({
        minLowercase: 1,
        minUppercase:1,
        minNumbers:1,
        minSymbols:1
    })
    password!: string;


    @IsNumber({
        allowNaN: false,
        allowInfinity:false,
    })
    @IsNotEmpty()
    phone!: number;

    @IsString()
    @MinLength(5)
    @MaxLength(20)
    country!: string;
 
    @IsString()
    @MinLength(3)
    @MaxLength(80)
    address!:string;


    @IsString()
    @MinLength(5)
    @MaxLength(20)
    city!: string;
}

export class LoginUserDto extends PickType(CreateUserDto,[
    'email',
    'password',
]) {}