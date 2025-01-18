import { IsString, IsEmail, IsOptional, IsNumber } from 'class-validator';

export class CreatePaymentDto {
    @IsString()
    bank: string;

    @IsString()
    identify: string;

    @IsEmail()
    email: string;

    @IsString()
    phone: string;

    @IsString()
    owner: string;

    @IsString()
    type: string;
}

export class UpdatePaymentDto extends CreatePaymentDto {
    @IsNumber()
    id: number;
}
