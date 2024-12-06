import { Controller, Get } from '@nestjs/common';
import { SparepartHistoryService } from './sparepart-history.service';
import { SparePartHistory } from '@prisma/client';

@Controller('sparepart-history')
export class SparepartHistoryController {
    constructor(private historyService: SparepartHistoryService) {
        
    }

    @Get()
    async getSparepartHistory(): Promise<SparePartHistory[]> {
        return await this.historyService.getSparepartHistory();
    }
}
