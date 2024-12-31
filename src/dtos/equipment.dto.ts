import { IsNumber, IsString } from "class-validator";

export class DtoEquipment {
    @IsString()
    model: string;
    @IsString()
    brand: string;
    @IsNumber()
    yearManufactured: number;
    @IsString()
    serialNumber: string;
    //float
    @IsString()
    loadCapacity: string;

    @IsString()
    dimensions: string;
    @IsNumber()
    currentStatusId: number;
}

export class DtoUpdateEquipment extends DtoEquipment {
    @IsNumber()
    id: number;
}