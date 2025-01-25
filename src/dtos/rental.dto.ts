import { Transform } from "class-transformer";
import { IsBoolean, IsDate, IsNumber, IsString } from "class-validator";
import { statusRental } from "src/rental/rental.service";

export class DtoRental {
    @IsNumber()
    clientId: number;
    @IsNumber()
    equipmentId: number;
    // @Transform(({ value }) => new Date(value))
    // @IsDate()
    // rentalStartDate: Date;
    // @Transform(({ value }) => new Date(value))
    // @IsDate()
    // rentalEndDate: Date;

    @IsNumber({allowInfinity: true, allowNaN: true})
    totalCost: number;
    @IsNumber()
    paymentId: number;
    @IsString()
    description: string;
}

export class DtoUpdateRental extends DtoRental {
    @IsNumber()
    id: number;
}

export class DtoUpdateStatusRental {
    @IsNumber()
    id: number;
    @IsString()
    status: statusRental;
}