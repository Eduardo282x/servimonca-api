import { Transform } from "class-transformer";
import { IsDate, IsNumber, IsString } from "class-validator";

export class DtoSparePartHistory {
    @IsNumber()
    sparePartId: number;
    @IsNumber()
    operationType: string;
    @IsNumber()
    quantity: number;
    @Transform(({ value }) => new Date(value))
    @IsDate()
    operationDate: Date
    @IsNumber()
    description: string;
}

export class DtoUpdateSparePartHistory extends DtoSparePartHistory {
    @IsNumber()
    id: number;
}