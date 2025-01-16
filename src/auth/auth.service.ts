import { Injectable } from '@nestjs/common';
import { DtoLogin, DtoUpdatePassword, ResponseLogin } from 'src/dtos/auth.dto';
import { badResponse, baseResponse, DtoBaseResponse } from 'src/dtos/base.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {

    constructor(private prismaService: PrismaService) { }

    async login(userLogin: DtoLogin): Promise<ResponseLogin | DtoBaseResponse> {
        const findUser = await this.prismaService.user.findFirst({
            where: {
                username: userLogin.username,
                password: userLogin.password,
            },
            include: {
                rol: true,
            }
        });

        if (!findUser) {
            badResponse.message = 'El email o la contraseña son incorrectos';
            return badResponse;
        }

        baseResponse.message = `Bienvenido ${findUser.firstName} ${findUser.lastName}`;
        const loginResponse: ResponseLogin = {
            ...baseResponse,
            userData: findUser
        }

        return loginResponse;
    }

    async changePassword(password: DtoUpdatePassword): Promise<DtoBaseResponse> {
        await this.prismaService.user.update({
            data: {
                password: password.password
            },
            where: {
                id: password.id
            }
        })

        baseResponse.message = 'Contraseña actualizada.'
        return baseResponse;
    }
}
