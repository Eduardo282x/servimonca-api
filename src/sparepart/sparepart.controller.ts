import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { SparepartService } from './sparepart.service';
import { SparePart } from '@prisma/client';
import { DtoSparePart, DtoUpdateSparePart } from 'src/dtos/spare-part.dto';

@Controller('sparepart')
export class SparepartController {

    constructor(private sparepartsService: SparepartService) {

    }

    @Get()
    async getAllSpareparts(): Promise<SparePart[]> {
        return await this.sparepartsService.getSpareparts();
    }

    @Post()
    async createSpareparts(@Body() sparePart: DtoSparePart) {
        return await this.sparepartsService.createSpareparts(sparePart);
    }

    @Put()
    async updateSpareparts(@Body() sparePart: DtoUpdateSparePart) {
        return await this.sparepartsService.updateSpareparts(sparePart);
    }

    @Delete('/:id')
    async deleteSpareparts(@Param('id') id: number) {
        return await this.sparepartsService.deleteSpareparts(id);
    }
}
