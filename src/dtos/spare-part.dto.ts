import { IsNumber, IsString } from "class-validator";

export class DtoSparePart {
    @IsString()
    sparePart: string;
    @IsString()
    model: string;
    @IsString()
    brand: string;
    @IsNumber()
    amount: number;
    @IsString()
    description: string;
    @IsNumber()
    criticAmount: number;
}

export class DtoUpdateSparePart extends DtoSparePart {
    @IsNumber()
    id: number;
}