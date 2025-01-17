import { IsNumber, IsOptional, IsString } from "class-validator";

export class DtoSparePart {
    @IsOptional()
    @IsString()
    sparePart: string;
    @IsOptional()
    @IsString()
    model: string;
    @IsOptional()
    @IsString()
    brand: string;
    @IsOptional()
    @IsNumber()
    amount: number;
    @IsOptional()
    @IsString()
    description: string;
    @IsOptional()
    @IsNumber()
    criticAmount: number;
}

export class DtoUpdateSparePart extends DtoSparePart {
    @IsOptional()
    @IsNumber()
    id?: number;
}

export class DtoUpdateStatusSparePart {
    @IsString()
    status: string;
    @IsNumber()
    id: number;
}