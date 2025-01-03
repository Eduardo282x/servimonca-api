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
    @IsNumber({allowInfinity: true, allowNaN: true})
    loadCapacity: number;
    @IsString()
    dimensions: string;
    @IsNumber()
    currentStatusId: number;
}

export class DtoUpdateEquipment extends DtoEquipment {
    @IsNumber()
    id: number;
}