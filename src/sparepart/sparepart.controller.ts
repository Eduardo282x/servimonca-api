import { Controller, Get } from '@nestjs/common';
import { SparepartService } from './sparepart.service';
import { SparePart } from '@prisma/client';

@Controller('sparepart')
export class SparepartController {

    constructor(private sparepartsService: SparepartService) {
        
    }

    @Get()
    async getAllSpareparts(): Promise<SparePart[]> {
        return await this.sparepartsService.getSpareparts();
    }
}
