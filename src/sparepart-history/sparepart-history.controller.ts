import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { SparepartHistoryService } from './sparepart-history.service';
import { SparePartHistory } from '@prisma/client';
import { DtoSparePartHistory, DtoUpdateSparePartHistory } from 'src/dtos/spare-part-history.dto';

@Controller('sparepart-history')
export class SparepartHistoryController {
    constructor(private historyService: SparepartHistoryService) {

    }

    @Get()
    async getSparepartHistory(): Promise<SparePartHistory[]> {
        return await this.historyService.getSparepartHistory();
    }

    @Post()
    async createSparePartHistory(@Body() sparePartHistory: DtoSparePartHistory) {
        return await this.historyService.createSparePartHistory(sparePartHistory);
    }

    @Put()
    async updateSparePartHistory(@Body() sparePart: DtoUpdateSparePartHistory) {
        return await this.historyService.updateSparePartHistory(sparePart);
    }

    @Delete('/:id')
    async deleteSparePartHistory(@Param('id') id: number) {
        return await this.historyService.deleteSparePartHistory(id);
    }
}
