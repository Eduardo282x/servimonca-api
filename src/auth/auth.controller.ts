import { Body, Controller, Post, Put } from '@nestjs/common';
import { AuthService } from './auth.service';
import { DtoLogin, DtoUpdatePassword, ResponseLogin } from 'src/dtos/auth.dto';
import { DtoBaseResponse } from 'src/dtos/base.dto';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) { }

    @Post()
    async authLogin(@Body() userLogin: DtoLogin): Promise<ResponseLogin | DtoBaseResponse> {
        return await this.authService.login(userLogin);
    }
    
    @Put('/password')
    async changePassword(@Body() password: DtoUpdatePassword): Promise<DtoBaseResponse> {
        return await this.authService.changePassword(password);
    }
}
