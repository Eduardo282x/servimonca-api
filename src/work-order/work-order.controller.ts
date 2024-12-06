import { Controller, Get } from '@nestjs/common';
import { WorkOrderService } from './work-order.service';
import { WorkOrder } from '@prisma/client';

@Controller('work-order')
export class WorkOrderController {

    constructor(private workOrderService: WorkOrderService) {
        
    }

    @Get()
    async getWorkOrders():Promise<WorkOrder[]> {
        return await this.workOrderService.getAllWorkOrders();
    }
}
