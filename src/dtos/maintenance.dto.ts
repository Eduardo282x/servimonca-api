import { Transform } from "class-transformer";
import { IsDate, IsNumber, IsOptional, IsString } from "class-validator";

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
    amount: number;
    @IsNumber()
    @IsOptional()
    clientId: number;
    @IsNumber()
    sparePartId: number;
}

export class DtoUpdateMaintenance extends DtoMaintenance {
    @IsNumber()
    id: number;
}

export class DtoUpdateCompleteMaintenance {
    @IsNumber()
    id: number;
    @IsString()
    description: string;
}

export class DtoUpdateStatusMaintenance {
    @IsNumber()
    id: number;
    @IsString()
    status: string;
}

export class DtoMaintenanceSparePart {
    @IsNumber()
    sparePartId: number;
    @IsNumber()
    amount: number;
}