import { ApiProperty, PickType } from '@nestjs/swagger';
import {
  IsEmail,
  IsEmpty,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsStrongPassword,
  MaxLength,
  MinLength,
  Validate,
} from 'class-validator';
import { MatchPassword } from '../../decorators/matchPassword.decorator';

export class CreateUserDto {
  @ApiProperty({ example: 'Facundo Frias', description: 'Nombre del usuario' })
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  name!: string;

  @ApiProperty({ example: 'facundo@mail.com', description: 'Correo electrónico' })
  @IsNotEmpty()
  @IsEmail({}, { message: 'Email debe ser valido' })
  email!: string;

  @ApiProperty({ example: 'Password123*', description: 'Contraseña segura' })
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(15)
  @IsStrongPassword({
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })
  password!: string;
  
  @ApiProperty({ example: 'Password123*', description: 'Confirmación de contraseña' })
  @IsNotEmpty()
  @Validate(MatchPassword, ['password'])
  confirmPassword!: string;

  @ApiProperty({ example: 1123456789, description: 'Número de teléfono' })
  @IsNumber({
    allowNaN: false,
    allowInfinity: false,
  })
  @IsNotEmpty()
  phone!: number;

  @ApiProperty({ example: 'Argentina', description: 'País' })
  @IsString()
  @MinLength(5)
  @MaxLength(20)
  country!: string;

  @ApiProperty({ example: 'Calle Falsa 123', description: 'Dirección' })
  @IsString()
  @MinLength(3)
  @MaxLength(80)
  address!: string;

  @ApiProperty({ example: 'Buenos Aires', description: 'Ciudad' })
  @IsString()
  @MinLength(5)
  @MaxLength(20)
  city!: string;
  
  @ApiProperty({ example: false, description: 'Es administrador', required: false })
  @IsEmpty()
  isAdmin?: boolean;
}

export class LoginUserDto {
  @ApiProperty({ example: 'facundo@mail.com', description: 'Correo electrónico' })
  @IsNotEmpty()
  @IsEmail()
  email!: string;

  @ApiProperty({ example: 'Password123*', description: 'Contraseña' })
  @IsNotEmpty()
  @IsString()
  password!: string;
}