import { Transform } from "class-transformer";
import { IsDate, IsNumber, IsString } from "class-validator";

export class DtoWorkOrder {
    @IsNumber()
    equipmentId: number;
    @Transform(({ value }) => new Date(value))
    @IsDate()
    workOrderDate: Date;
    @IsString()
    description: string;
    @IsString()
    workOrderStatus: string;
}

export class DtoUpdateWorkOrder extends DtoWorkOrder{
    @IsNumber()
    id: number;
}