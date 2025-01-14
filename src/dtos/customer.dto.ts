import { IsNumber, IsString } from "class-validator";

export class DtoClients {
    @IsString()
    name: string
    @IsString()
    lastname: string
    @IsString()
    rif: string
    @IsString()
    phone: string
    @IsString()
    email: string
    @IsString()
    address: string
}

export class DtoUpdateClients extends DtoClients {
    @IsNumber()
    id: number;
}