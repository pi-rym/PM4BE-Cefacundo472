
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './entities/users.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/users.dto';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(Users) private ormUsersRepository: Repository<Users>,
  ) {}

  async getAllUsers(
    page: number,
    limit: number,
  ): Promise<Omit<Users, 'password'>[]> {
    const skip = (page - 1) * limit;
    const allUsers = await this.ormUsersRepository.find({
      skip: skip,
      take: limit,
    });
    return allUsers.map(({ password, ...userNoPasword }) => userNoPasword);
  }

  async getUserById(id: string): Promise<Omit<Users, 'password'>> {
    const foundUser = await this.ormUsersRepository.findOne({
      where: { id },
      relations: {
        orders: {
          orderDetail: {
            products: true,
          },
        },
      },
    });

    if (!foundUser) {
      throw new NotFoundException(`No se encontró el usuario con id ${id}`);
    }
    
    const { password, ...userNoPassword } = foundUser;
    return userNoPassword;
  }

  async getUserByEmail(email: string): Promise<Users | null> {
    return await this.ormUsersRepository.findOneBy({ email });
  }

  async addUser(newUserData: CreateUserDto): Promise<string> {
    const savedUser = await this.ormUsersRepository.save(newUserData);
    return savedUser.id;
  }

  async updateUser(
    id: string,
    newUserData: Users,
  ): Promise<Omit<Users, 'password'>> {
    const user = await this.ormUsersRepository.findOneBy({ id });
    
    if (!user) {
      throw new NotFoundException(`No existe usuario con id ${id}`);
    }

    const mergedUser = this.ormUsersRepository.merge(user, newUserData);
    const savedUser = await this.ormUsersRepository.save(mergedUser);
    const { password, ...userNoPassword } = savedUser;
    
    return userNoPassword;
  }

  //async deleteUser(id: string): Promise<string> {
    //const foundUser = await this.ormUsersRepository.findOneBy({ id });
    //if (!foundUser) throw new Error(`No existe usuario con id ${id}`);
    //await this.ormUsersRepository.remove(foundUser);
    //return foundUser.id;
  //}



}