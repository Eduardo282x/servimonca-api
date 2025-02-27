import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { DtoUpdateUser, DtoUser } from 'src/dtos/user.dto';

@Controller('user')
export class UserController {

    constructor(private userServices: UserService) {}

    @Get()
    async getAllUsers() {
        return await this.userServices.getAllUsers();
    }
    @Get('/roles')
    async getRoles() {
        return await this.userServices.getRoles();
    }

    @Post()
    async createUser(@Body() newUser: DtoUser) {
        return await this.userServices.createUser(newUser);
    }

    @Put()
    async updateUser(@Body() user: DtoUpdateUser) {
        return await this.userServices.updateUser(user);
    }

    @Delete('/:id')
    async deleteUser(@Param('id') id: string) {
        return await this.userServices.deleteUser(Number(id));
    }
}
