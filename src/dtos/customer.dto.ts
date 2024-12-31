import { IsNumber, IsString } from "class-validator";

export class DtoCustomer {
    @IsString()
    customerName: string;
    @IsString()
    customerLastname: string;
    @IsString()
    customerEmail: string;
    @IsString()
    customerAddress: string;
}

export class DtoUpdateCustomer extends DtoCustomer {
    @IsNumber()
    id: number;
}