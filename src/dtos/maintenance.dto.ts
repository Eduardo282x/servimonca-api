import { Transform } from "class-transformer";
import { IsDate, IsNumber, IsString } from "class-validator";

export class DtoMaintenance {
    @IsString()
    maintenanceType: string;
    @Transform(({ value }) => new Date(value))
    @IsDate()
    maintenanceDate: Date;
    @IsString()
    description: string;
    @IsNumber()
    equipmentId: number;
}

export class DtoUpdateMaintenance extends DtoMaintenance {
    @IsNumber()
    id: number;
}