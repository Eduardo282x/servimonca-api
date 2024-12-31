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
    @IsNumber({allowInfinity: true, allowNaN: true})
    rentalRate: number;
    @IsNumber({allowInfinity: true, allowNaN: true})
    totalCost: number;
    @IsNumber()
    paymentId: number;
}

export class DtoUpdateRental extends DtoRental {
    @IsNumber()
    id: number;
}