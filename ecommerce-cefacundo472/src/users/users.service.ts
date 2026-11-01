import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { CreateUserDto } from './dto/users.dto';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  getAllUsers(validPage: number, validLimit: number): any {
    return this.usersRepository.getAllUsers(validPage, validLimit);
  }

  getUserById(id: string) {
    return this.usersRepository.getUserById(id);
  }

  // addUser(newUser: CreateUserDto) {
  //   return this.usersRepository.addUser(newUser);
  // }

  updateUser(id: string, userNewData: any) {
    return this.usersRepository.updateUser(id, userNewData);
  }

  async deleteUser(id: string) {
    return await this.usersRepository.deleteUser(id);
  }
}