import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { SparepartService, statusSparePart } from './sparepart.service';
import { SparePart } from '@prisma/client';
import { DtoSparePart, DtoUpdateSparePart, DtoUpdateStatusSparePart } from 'src/dtos/spare-part.dto';

@Controller('sparepart')
export class SparepartController {

    constructor(private sparepartsService: SparepartService) {

    }

    @Get('/:status')
    async getAllSpareparts(@Param('status') status: statusSparePart): Promise<SparePart[]> {
        return await this.sparepartsService.getSpareparts(status);
    }

    @Post()
    async createSpareParts(@Body() sparePart: DtoUpdateSparePart) {
        return await this.sparepartsService.createSpareParts(sparePart);
    }

    @Put()
    async updateSpareParts(@Body() sparePart: DtoUpdateSparePart) {
        return await this.sparepartsService.updateSpareParts(sparePart);
    }

    @Put('/status')
    async updateSparePartsStatus(@Body() sparePart: DtoUpdateStatusSparePart) {
        return await this.sparepartsService.updateSparePartsStatus(sparePart);
    }

    @Delete('/:id')
    async deleteSpareParts(@Param('id') id: number) {
        return await this.sparepartsService.deleteSpareParts(id);
    }
}
