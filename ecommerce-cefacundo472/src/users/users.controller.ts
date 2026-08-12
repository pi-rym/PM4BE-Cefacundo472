import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put, Query, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { Users } from './entities/users.entity';
import { AuthGuard } from '../auth/guards/auth.guard';
import { CreateUserDto } from './dto/users.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    @UseGuards(AuthGuard)
    getAllusers(@Query('page') page?: string, @Query('limit') limit?: string) {
        const pageNum = Number(page);
        const limitNum = Number(limit);

        const validPage = !isNaN(pageNum) && pageNum > 0 ? pageNum : 1;
        const validLimit = !isNaN(limitNum) && limitNum > 0 ? limitNum : 5;

        return this.usersService.getAllUsers(validPage, validLimit);
    }

    @Get(':id')
    @UseGuards(AuthGuard)
    getUserById(@Param('id', ParseUUIDPipe) id: string) {
        return this.usersService.getUserById(id);
    }

    @Post()
    addUsser(@Body() newUser: CreateUserDto) {
        return this.usersService.addUser(newUser);
    }

    @Put(':id')
    @UseGuards(AuthGuard)
    updateUser(@Param('id', ParseUUIDPipe) id: string, @Body() userNewData: any) {
        return this.usersService.updateUser(id, userNewData);
    }

    //@Delete(':id')
    //@UseGuards(AuthGuard)
    //deleteUser(@Param('id', ParseUUIDPipe) id: string) {
    //    return this.usersService.deleteUser(id); 
    //}
}