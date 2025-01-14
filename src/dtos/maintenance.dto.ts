import { Transform } from "class-transformer";
import { IsDate, IsNumber, IsString } from "class-validator";

export class DtoMaintenance {
    @Transform(({ value }) => new Date(value))
    @IsDate()
    maintenanceDate: Date;
    @IsString()
    description: string;
    @IsString()
    type: string;
    @IsNumber()
    equipmentId: number;
    @IsNumber()
    sparePartId: number;
}

export class DtoUpdateMaintenance extends DtoMaintenance {
    @IsNumber()
    id: number;
}