import { Injectable } from '@nestjs/common';
import { UsersRepository } from '../users/users.repository';

@Injectable()
export class AuthService {
    
   constructor(private readonly usersRepository: UsersRepository){}
      
   getAuth(): string{
    return 'Auth';
   }

   signIn(email:string, password:string){
      if(!email || password){
         return 'Email o password incorrectos'
      }

      const foundUser = this.usersRepository.getUserByEmail(email);
      if(!foundUser){
         return 'Email o password incorrectos';
      }

      if(foundUser.password !== password){
         return 'Email o password incorrectos';
      }

      return 'Usuario logueado (EsteEsElToken)';
   }

}
