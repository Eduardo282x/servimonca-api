import { IsNumber, IsString } from "class-validator";

export class DtoSparePart {
    @IsString()
    sparePartName: string;
    @IsString()
    description: string;
    @IsNumber()
    currentStock: number;
    @IsNumber()
    minimumStock: number;
    @IsNumber()
    maximumStock: number;
}

export class DtoUpdateSparePart extends DtoSparePart {
    @IsNumber()
    id: number;
}