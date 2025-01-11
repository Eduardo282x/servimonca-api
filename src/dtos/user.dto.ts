import { IsNumber, IsString } from "class-validator";

export class DtoUser {
    @IsString()
    firstName: string;
    @IsString()
    lastName: string;
    @IsString()
    username: string;
    @IsString()
    identify: string;
    @IsNumber()
    rolId: number;
}

export class DtoUpdateUser extends DtoUser {
    @IsNumber()
    id: number;
}