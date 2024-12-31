import { Transform } from "class-transformer";
import { IsDate, IsNumber, IsString } from "class-validator";

export class DtoRental {
    @IsNumber()
    customerId: number;
    @IsNumber()
    equipmentId: number;
    @Transform(({ value }) => new Date(value))
    @IsDate()
    rentalStartDate: Date;
    @Transform(({ value }) => new Date(value))
    @IsDate()
    rentalEndDate: Date;
    @IsString()
    rentalRate: string;
    @IsString()
    totalCost: string;
    @IsNumber()
    paymentId: number;
}

export class DtoUpdateRental extends DtoRental {
    @IsNumber()
    id: number;
}