import { IsNumber, IsString } from "class-validator";

export class DtoEquipment {
    @IsString()
    model: string;
    @IsString()
    serialNumber: string;
    @IsString()
    currentStatus: string;
    @IsString()
    placa: string;
}

export class DtoUpdateEquipment extends DtoEquipment {
    @IsNumber()
    id: number;
}