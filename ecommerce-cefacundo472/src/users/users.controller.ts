import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './users.repository';
import { AuthGuard } from '../auth/guards/auth.guard';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService:UsersService){}

      @Get()
      @HttpCode(200)
      @UseGuards(AuthGuard)
      getAllusers(@Query('page') page?: string,@Query('limit') limit?: string): User[] {
        
        const pageNum = Number(page);
        const limitNum = Number(limit);

        const validPage = !isNaN(pageNum) && pageNum > 0 ? pageNum : 1;
        const validLimit = !isNaN(limitNum) && limitNum > 0 ? limitNum : 5;


        


        
        return this.usersService.getAllUsers(validPage, validLimit);
      }

     @Get(':id')
     getUserById(@Param('id') id: string){
      return this.usersService.getUserById(id);
     }

     @Post()
     addUsser(@Body() newUser: any ){
        if(!newUser.email) return 'Email es obligatorio';
        if(!newUser.name) return 'Nombre es obligatorio';
      
       

      return this.usersService.addUser(newUser);
     }


     @Put(':id')
     updateUser(@Param('id') id: string, @Body() userNewData: any ) {
      return this.usersService.updateUser(id, userNewData);
     }


     @Delete(':id')
     deleteUser(@Param('id') id: string) {
      return this.usersService.deleteUser(id); 
     }


}




