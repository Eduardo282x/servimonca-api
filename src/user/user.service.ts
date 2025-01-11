import { Injectable } from '@nestjs/common';
import { User, Roles } from '@prisma/client';
import { baseResponse, DtoBaseResponse } from 'src/dtos/base.dto';
import { DtoUpdateUser, DtoUser } from 'src/dtos/user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {

    constructor(private prismaService: PrismaService) { }

    async getAllUsers(): Promise<User[]> {
        return await this.prismaService.user.findMany({
            orderBy:{
                id: 'asc'
            },
            include: {
                rol: true
            },
        });
    }

    async getRoles():Promise<Roles[]> {
        return await this.prismaService.roles.findMany();
    }

    async createUser(newUser: DtoUser): Promise<DtoBaseResponse> {
        try {
            await this.prismaService.user.create({
                data: {
                    firstName: newUser.firstName,
                    lastName: newUser.lastName,
                    username: newUser.username,
                    identify: newUser.identify,
                    password: newUser.identify,
                    rolId: newUser.rolId,
                    status: true,
                },
            });
            baseResponse.message = 'Usuario creado exitosamente';
            return baseResponse;
        } catch (err) {
            baseResponse.message += err.message;
            return baseResponse;
        }
    }

    async updateUser(user: DtoUpdateUser): Promise<DtoBaseResponse> {
        try {
            await this.prismaService.user.update({
                data: {
                    firstName: user.firstName,
                    lastName: user.lastName,
                    username: user.username,
                    identify: user.identify,
                    rolId: user.rolId,
                    status: true,
                },
                where: {
                    id: user.id
                }
            });
            baseResponse.message = 'Usuario actualizado exitosamente';
            return baseResponse;
        } catch (err) {
            baseResponse.message += err.message;
            return baseResponse;
        }
    }

    async deleteUser(id: number): Promise<DtoBaseResponse> {
        try {
            await this.prismaService.user.delete({
                where: {
                    id: id
                }
            });
            baseResponse.message = 'Usuario eliminado exitosamente';
            return baseResponse;
        } catch (err) {
            baseResponse.message += err.message;
            return baseResponse;
        }
    }
}
