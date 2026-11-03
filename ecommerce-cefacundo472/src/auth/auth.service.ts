import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { UsersRepository } from '../users/users.repository';
import { CreateUserDto } from '../users/dto/users.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Roles } from '../decorators/roles.decorator';
import { Role } from '../common/roles.enum';


@Injectable()
export class AuthService {
  constructor(private readonly usersRepository: UsersRepository,
    private readonly jwtService: JwtService,
  ) {}

  getAuth(): string {
    return 'Auth';
  }

  async signIn(email: string, password: string) {
    

    const foundUser = await this.usersRepository.getUserByEmail(email);
    if (!foundUser) {
      throw new UnauthorizedException('Email o password incorrectos');
    }

    const validPassword = await bcrypt.compare(password, foundUser.password);
       if(!validPassword){
        throw new UnauthorizedException('Email o password incorrectos');
       }
       
      const payload = {
         id: foundUser.id,
         //email:foundUser.email,
         roles: foundUser.isAdmin ? [Role.Admin] : [Role.User],
        }; 
      const token = this.jwtService.sign(payload)
      

    return {
      message: 'Usuario logueado',
      token,
    };
  }


  async signUp(newUserData: CreateUserDto){
     const { email, password } = newUserData;
     const foundUser = await this.usersRepository.getUserByEmail(email);
     if(foundUser){
      throw new BadRequestException('El email ya se encuentra registrado');
     }
        
    const hashedPassword = await bcrypt.hash(password, 10);

    return await this.usersRepository.addUser({
      ...newUserData,
      password: hashedPassword,
    });

     
  }
}
