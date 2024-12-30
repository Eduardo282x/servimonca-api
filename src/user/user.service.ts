import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { baseResponse, DtoBaseResponse } from 'src/dtos/base.dto';
import { DtoUpdateUser, DtoUser } from 'src/dtos/user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {

    constructor(private prismaService: PrismaService) { }

    async getAllUsers(): Promise<User[]> {
        return await this.prismaService.user.findMany();
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
                    status: newUser.status,
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
                    status: user.status,
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
}
