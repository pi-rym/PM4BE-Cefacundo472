import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { UsersRepository } from '../users/users.repository';

@Injectable()
export class AuthService {
    
   constructor(private readonly usersRepository: UsersRepository){}
     
   getAuth(): string{
    return 'Auth';
   }

   async signIn(email: string, password: string){
      if(!email || !password){
         throw new BadRequestException('Email o password incorrectos');
      }

      const foundUser = await this.usersRepository.getUserByEmail(email);
      if(!foundUser){
         throw new UnauthorizedException('Email o password incorrectos');
      }

      if(foundUser.password !== password){
         throw new UnauthorizedException('Email o password incorrectos');
      }

      return 'Usuario logueado (EsteEsElToken)';
   }
}